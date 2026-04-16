import express from "express";
import dbConnect from "./dbConnect.js";
import User from "./models/User.js"

const app = express();
const PORT = 8800;
app.use(express.json());
dbConnect();
app.post("/user", async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);
        
        const user = await User.create(userData);
        res.status(200).json({ message: "User has benn created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`))