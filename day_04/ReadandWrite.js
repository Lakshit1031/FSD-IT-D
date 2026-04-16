import fs from "fs/promises";
export const readFile = async (path) => {
    try {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log("Unable to read");
    }
}
export const writeFile = async (path, data) => {
    let status = 0;
    let message = "";
    try {
        await fs.writeFile(path, data);
        status = 200;
        message = "Data has been written successfully";
    } catch (error) {
        status = 500;
        message = "Unable to write";
    }
    return {status,message};
}
// readFile("./students.json")
//     .then((data) => console.log(data))

