import http from "http";
import { userLogin } from "./login.js";
import { register } from "./register.js";
import { changePassword } from "./changePassword.js";
import {deleteUser} from "./deleteUser.js"
const PORT = 8800;
const server = http.createServer((req, res) => {
    if (req.url === "/login" && req.method === "POST") {
        let body = "";
        req.on("data", (dataChunk) => {
            body += dataChunk.toString();
        })
        req.on("end", async () => {
            const userDetails = JSON.parse(body); //obj
            const response = await userLogin(userDetails, "./users.json");
            res.writeHead(200, { "Contant-type": "application/json" });
            res.end(JSON.stringify(response));
        })
    } else if (req.url === "/register" && req.method === "POST") {
        let body = "";
        req.on("data", (dataChunk) => {
            body += dataChunk.toString();
        })
        req.on("end", async () => {
            const userDetails = JSON.parse(body);
            const response = await register(userDetails, "./users.json");
            res.writeHead(200, { "Contant-type": "application/json" });
            res.end(JSON.stringify(response));
        })
    } else if (req.url === "/change-password" && req.method === "POST") {
        let body = "";
        req.on("data", (dataChunk) => {
            body += dataChunk.toString();
        })
        req.on("end", async () => {
            const userDetails = JSON.parse(body);
            const response = await changePassword(userDetails, "./users.json");
            res.writeHead(200, { "Contant-type": "application/json" });
            res.end(JSON.stringify(response));
        })
    } else if (req.url === "/delete-user" && req.method === "POST") {
        let body = "";
        req.on("data", (dataChunk) => {
            body += dataChunk.toString();
        })
        req.on("end", async () => {
            const userDetails = JSON.parse(body);
            const response = await deleteUser(userDetails, "./users.json");
            res.writeHead(200, { "Contant-type": "application/json" });
            res.end(JSON.stringify(response));
        })
    } else {
        res.end("Server is live");
    }
})
server.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))