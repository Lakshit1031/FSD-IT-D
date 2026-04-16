import mongoose from "mongoose";
const MONGO_URI = "mongodb+srv://user:admin@userlogin.gvzptpp.mongodb.net/mongoosedb?appName=userLogin";
const dbConnect = async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB connection is established successfully");
    } catch (error) {
        console.log("DB connection Error",error.message);       
    }
}
// dbConnect();
export default dbConnect;