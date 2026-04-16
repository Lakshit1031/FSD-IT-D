import dbConnect from "../index.js"
const findAllUsers = async () => {
    try {
        const db = await dbConnect();
        const userLoginCollection = db.collection("login");
        const users = await userLoginCollection.find().toArray();
        console.log(users);
    } catch (error) {
        console.log("Find error", error.message);
    }
}
findAllUsers();
const findOne = async () => {
    try {
        const db = await dbConnect();
        const userLoginCollection = db.collection("login");
        const user = await userLoginCollection.findOne({ email: "abc2@gmail.com" });
        console.log(user);
    } catch (error) {
        console.log("Read Error", error.message);
    }
}
// findOne();