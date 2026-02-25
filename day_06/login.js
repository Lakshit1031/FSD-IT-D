import { readFile, writeFile } from "./readAndWrite.js";
const FILE = "./users.json";

export const userLogin = async (data) => {
    const { email, password } = data;
    const usersData = await readFile(FILE);
    let message = "";
    if (usersData.length === 0) {
        message = "user is not registered";
        return;
    }
    const user = usersData.filter((user) => user.email === email);

    if (user.length === 0) {
        message = "user is not registered";
        return;
    } else {
        user[0].password === password ?
            message = "Login successfull":
            message = "password incorrect";
    }
    return message;
}
// userLogin({email: "dstirrip9@bigcartel.com",password: "qJ7\\3\\dTNr"});
// userLogin({email: "dstirrip9@bigcartel.com",password: "qJ7"});
// userLogin({email:"abc@gmail.com",password:"12234"});