import dbConnect from "../index.js"
const insertMany = async () => {
    try {
        const db = await dbConnect();
        const userLoginCollection = db.collection("login");
        const user = [{
            name: "abc2",
            email: "abc2@gmail.com",
            password: "12145678"
        },
        {
            name: "abc3",
            email: "abc3@gmail.com",
            password: "12145678"
        },
        {
            name: "abc4",
            email: "abc4@gmail.com",
            password: "12145678"
        }]
        const users = await userLoginCollection.insertMany(user);
        console.log("Users has been inserted successfully", users.insertedIds);
    } catch (error) {
        console.log("Insertion Error", error.message);
    }
}
insertMany();

const insertOne = async () => {
    try {
        const db = await dbConnect();
        const userLoginCollection = db.collection("login");
        const user = await userLoginCollection
            .insertOne({ name: "abc", email: "abc@gmail.com", password: "12345", gender: "F" });
        console.log("User is created successfully: ", user.insertedId);
    } catch (error) {
        console.log("Insertion Error", error.message);
    }
}
// insertOne();