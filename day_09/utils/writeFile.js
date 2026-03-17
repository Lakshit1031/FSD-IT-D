import fs from "fs/promises";
export const writeFile = async (path, data) => {
    let message = "";
    let status = 0;
    try {
        await fs.writeFile(path, JSON.stringify(data, null, 2));
        message = "User has been registered successfully."
        status = 200;
    } catch (error) {
        message = "Unable to register"
        status = 500;
    }
    return { message, status };
}