import { readFile, writeFile } from "fs/promises";
const FILE = "./users.json";

const register = async(data) =>{
    const fileData = await readFile(FILE);
    const updateData = [...fileData, data];
    const response = await writeFile(FILE,JSON.stringify(updateData,null,2));
    console.log(response.status);
}
const login = async(data) => {
    const {email, password} = data;
    const fileData = await readFile(FILE);
    if(fileData.length === 0) return;
    const user = fileData.find((d) => d.email === email && d.password === password);
    if(user) {
        console.log("Login successful");
    } else {
        console.log("Invalid email or password");
    }
}
const changePassword = async(data) => {
    const {email, oldPassword, newPassword} = data;
    const fileData = await readFile(FILE);
    if(fileData.length === 0) return;
    
    const userIndex = fileData.findIndex((d) => d.email === email && d.password === oldPassword);
    
    if(userIndex === -1) {
        console.log("Invalid email or old password");
        return;
    }
    
    fileData[userIndex].password = newPassword;
    const response = await writeFile(FILE, JSON.stringify(fileData, null, 2));
    console.log("Password changed successfully");
}

const deleteUser = async(id) => {
    const fileData = await readFile(FILE);
    if(!fileData.length === 0) return;
    const updateData = fileData.filter((d) => d.id !== id);
    const response = await writeFile(FILE,JSON.stringify(updateData,null,2));
    console.log(response.status);
}