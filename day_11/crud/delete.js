import dbConnect from "../index.js";
const deleteMany = async () => {
    try {
        const db = await dbConnect();
        const userLoginCollection = db.collection("login");
        const user = await userLoginCollection.deleteMany({ email: "abc2@gmail.com" });
        console.log("User has been deleted successfully", user.deletedCount);
    } catch (error) {
        console.log("Deletion Error", error.message);
    }
}
deleteMany();
const deleteOne = async () => {
    try {
        const db = await dbConnect();
        const userLoginCollection = db.collection("login");
        const user = await userLoginCollection.deleteOne({ email: "abc2@gmail.com" });
        console.log("User has been deleted successfully", user.deletedCount);
    } catch (error) {
        console.log("Deletion Error", error.message);
    }
}
// deleteOne();