import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum:["M","F","Male","Female"]
    }
})
const User = mongoose.model("users",UserSchema);
export default User;