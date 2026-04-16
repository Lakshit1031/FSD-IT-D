import { readFile } from "../utils/readFile.js";
import { writeFile } from "../utils/writeFile.js";
const register = async (FILE,users, userDetails) => {
    const updatedUsers = [...users, { id: users.length + 1, ...userDetails }];
    const resposnse = await writeFile(FILE, updatedUsers);
    console.log(resposnse.message);
    return;
}
export const userRegistration = async (FILE, userDetails) => {
    try {
        console.log(userDetails);
        const { name, email, password } = userDetails;
        if (!name || !email || !password) {
            return { message: "all fields are req", status: 401 };
        }
        const users = await readFile(FILE);
        if (users.length === 0) {
            register(users, userDetails);
        }
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            console.log("Already Registered. Please try to login");
            return;
        }
        register(FILE,users, userDetails);
        return { message: "successful", status: 200 };
    } catch (error) {
        return { message: "unsuccessful", status: 500 };
    }
}
userRegistration({
    "name": "Darsie",
    "email": "dstirrip9@bigcdfgartel.com",
    "password": "qJ7\\3\\dTNr"
})