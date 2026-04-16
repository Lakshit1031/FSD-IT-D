import { readFile, writeFile } from "./readAndWrite.js";
export const userLogin = async (data, FILE) => {
    const users = await readFile(FILE);
    if (users.length === 0) return { message: "User is not Registered" };

    const user = users.find((user) => user.email === data.email);
    if (!user) return { message: "User is not Registered" };

    return user.password === data.password
        ? { message: "Login Successfull" }
        : { message: "Incorrect Password" }
}

// userLogin({ email: "cclimpson0@auda.org.au", password: "aL8)5(gt5Tc5W@_" }, "./users.json")
//     .then((res) => console.log(res))