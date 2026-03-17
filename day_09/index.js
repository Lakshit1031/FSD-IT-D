import express from "express";
import { userRegistration } from "./controller/userRegistration.js";
const app = express();
const PORT = 5600;
const FILE = "./user.json";
app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const res = await userRegistration(FILE, req.body);
        res.send(res.message);
    } catch (error) {
        res.send("unsuccessfull")
    }
})

app.get("/", (req, res) => {
    console.log(req);
    res.send("Home Page");
})

app.listen(PORT, () =>
    console.log(`server is running at http://localhost:${PORT}`));