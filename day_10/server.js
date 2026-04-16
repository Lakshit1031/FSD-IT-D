import express from 'express';
import { userLogin } from './login.js';
import { readFile } from './readAndWrite.js';
import { changePassword } from './changePassword.js';
const app = express();
app.use(express.json());
app.post("/login", async (req, res) => {
    try {
        const response = await userLogin(req.body, "./users.json");
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.get("/users", async (req, res) => {
    try {
        const users = await readFile("./users.json");
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.post("/change-password", async (req,res) => {
    try {
        const response = await changePassword(req.body, "./users.json");
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.listen(5500,
    () => console.log(`server is running at http://localhost:5500`));
