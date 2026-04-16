import fs from "fs/promises";
export const readFile = async (path) => {
    try {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log("unable to read file");
    }
}
export const writeFile = async (path, data) => {
    try {
        await fs.writeFile(path,data);
        console.log("data has been written successfully.");      
    } catch (error) {
       console.log("unable to write data");      
    }
}
