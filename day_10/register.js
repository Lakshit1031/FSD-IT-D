import { readFile, writeFile } from "./readAndWrite.js"
export const register = async (userDetails, FILE) => {
    const users = await readFile(FILE);
    let updatedData = [];
    if (users.length === 0) updatedData = [{ id: 1, ...userDetails }];

    const user = users.find((user) => user.email === userDetails.email);
    if (user) return { message: "Please try to login" }
    updatedData = [...users, { id: users.length + 1, ...userDetails }];

    const response = await writeFile(FILE, updatedData);
    return response;

}
// register({ name: "abc", email: "abcdef@gmail", password: "1234" }, "./users.json")
//     .then((res) => console.log(res) )