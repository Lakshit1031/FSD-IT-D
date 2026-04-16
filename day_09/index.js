import express from "express";
import { userRegistration } from "./controller/userRegistration.js";
const app = express();
const PORT = 5600;
const FILE = "./user.json";
app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const response = await userRegistration(FILE, req.body);
        res.status(200).json({message: response.message});
    } catch (error) {
        console.log(error);    
        res.status(200).json({message: error});
    }
})

app.listen(PORT, () =>
    console.log(`server is running at http://localhost:${PORT}`));