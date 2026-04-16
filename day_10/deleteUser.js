import { readFile, writeFile } from "./readAndWrite.js"
export const deleteUser = async (userDetails, FILE) => {
    const users = await readFile(FILE);
    console.log(users.length);

    if (users.length === 0) return { message: "User is not registered." };
   
    const user = users.find((user)=>user.email===userDetails.email);
    if(!user) return { message: "User is not registered." }

    const updatedData = users.filter((user) => user.email !== userDetails.email);
    console.log(updatedData);
    const response = await writeFile(FILE, updatedData);
    return response;
}
// deleteUser({ email: "abc@gmail.com" }, "./users.json")
//     .then((response) => console.log(response))