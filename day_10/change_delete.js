const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = 3000;
const DB_FILE = path.join(__dirname, "users.json");

function loadUsers() {
  if (!fs.existsSync(DB_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function sendJSON(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

function validate({ name, email, password }) {
  if (!name || name.trim().length < 2)
    return "Name must be at least 2 characters.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Please enter a valid email address.";
  if (!password || password.length < 6)
    return "Password must be at least 6 characters.";
  return null;
}

function handleRegister(req, res) {
  parseBody(req)
    .then(({ name, email, password }) => {
      const error = validate({ name, email, password });
      if (error) return sendJSON(res, 400, { success: false, message: error });

      const users = loadUsers();
      const exists = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (exists)
        return sendJSON(res, 409, {
          success: false,
          message: "Email is already registered.",
        });

      const newUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashPassword(password),
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      sendJSON(res, 201, {
        success: true,
        message: "Registration successful! Welcome aboard.",
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
    })
    .catch(() =>
      sendJSON(res, 400, { success: false, message: "Invalid request body." })
    );
}


function handleChangePassword(req, res) {
  parseBody(req)
    .then(({ email, currentPassword, newPassword }) => {
      if (!email || !currentPassword || !newPassword)
        return sendJSON(res, 400, { success: false, message: "email, currentPassword and newPassword are required." });

      if (newPassword.length < 6)
        return sendJSON(res, 400, { success: false, message: "New password must be at least 6 characters." });

      if (currentPassword === newPassword)
        return sendJSON(res, 400, { success: false, message: "New password must differ from the current password." });

      const users = loadUsers();
      const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());

      if (idx === -1)
        return sendJSON(res, 404, { success: false, message: "No account found with that email." });

      if (users[idx].password !== hashPassword(currentPassword))
        return sendJSON(res, 401, { success: false, message: "Current password is incorrect." });

      users[idx].password = hashPassword(newPassword);
      users[idx].updatedAt = new Date().toISOString();
      saveUsers(users);

      sendJSON(res, 200, {
        success: true,
        message: "Password updated successfully.",
        user: { id: users[idx].id, name: users[idx].name, email: users[idx].email },
      });
    })
    .catch(() => sendJSON(res, 400, { success: false, message: "Invalid request body." }));
}

function handleDeleteUser(req, res) {
  parseBody(req)
    .then(({ email, password }) => {
      if (!email || !password)
        return sendJSON(res, 400, { success: false, message: "email and password are required." });

      const users = loadUsers();
      const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());

      if (idx === -1)
        return sendJSON(res, 404, { success: false, message: "No account found with that email." });

      if (users[idx].password !== hashPassword(password))
        return sendJSON(res, 401, { success: false, message: "Password is incorrect." });

      const [deleted] = users.splice(idx, 1);
      saveUsers(users);

      sendJSON(res, 200, {
        success: true,
        message: `Account for "${deleted.name}" has been permanently deleted.`,
        deletedUser: { id: deleted.id, name: deleted.name, email: deleted.email },
      });
    })
    .catch(() => sendJSON(res, 400, { success: false, message: "Invalid request body." }));
}

function handleGetUsers(req, res) {
  const users = loadUsers().map(({ id, name, email, createdAt }) => ({
    id,
    name,
    email,
    createdAt,
  }));
  sendJSON(res, 200, { success: true, count: users.length, users });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const method = req.method.toUpperCase();

  // CORS preflight
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    });
    return res.end();
  }

  // Serve frontend
  if (method === "GET" && url.pathname === "/") {
    return sendFile(
      res,
      path.join(__dirname, "index.html"),
      "text/html"
    );
  }

  // API routes
  if (url.pathname === "/api/register" && method === "POST")
    return handleRegister(req, res);

  if (url.pathname === "/api/users" && method === "GET")
    return handleGetUsers(req, res);

  if (url.pathname === "/api/change-password" && method === "PUT")
    return handleChangePassword(req, res);

  if (url.pathname === "/api/delete-user" && method === "DELETE")
    return handleDeleteUser(req, res);

  sendJSON(res, 404, { success: false, message: "Route not found." });
});

server.listen(PORT, () => {
  console.log(`\n✅  Server running at http://localhost:${PORT}`);
  console.log(`📋  Registered users: GET  http://localhost:${PORT}/api/users`);
  console.log(`📝  Register user:      POST   http://localhost:${PORT}/api/register`);
  console.log(`🔑  Change password:    PUT    http://localhost:${PORT}/api/change-password`);
  console.log(`🗑️   Delete user:        DELETE http://localhost:${PORT}/api/delete-user\n`);
});