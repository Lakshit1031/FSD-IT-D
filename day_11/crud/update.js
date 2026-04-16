import dbConnect from "../index.js"
const updateMany = async () => {
    try {
        const db = await dbConnect();
        const userLoginCollection = db.collection("login");
        const user = await userLoginCollection.updateMany(
            { email: "abc2@gmail.com" },
            { $set: { name: "rohini", gender: "F" } });
        console.log("User has been updated successfully", user.modifiedCount);
    } catch (error) {
        console.log("Updation Error", error.message);
    }
}
updateMany();
const updateOne = async () => {
    try {
        const db = await dbConnect();
        const userLoginCollection = db.collection("login");
        const user = await userLoginCollection.updateOne(
            { email: "abc2@gmail.com" },
            { $set: { name: "xyz", gender: "M" } });
        console.log("User has been updated successfully", user.modifiedCount);
    } catch (error) {
        console.log("Updation Error", error.message);
    }
}
// updateOne();