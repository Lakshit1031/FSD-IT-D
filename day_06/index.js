import express from "express";
import { userLogin } from "./login.js";
import cors from "cors";
const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("HOME PAGE")
})
app.post("/login", async(req, res) => {
    const response = await userLogin(req.body);   
    console.log(response);
     
    res.send(response);
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));