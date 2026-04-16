import { readFile, writeFile } from "../day_04/readAndWrite.js";
const FILE = "../day_04/students.json";

const deteleFileData = async (id) => {
    const fileData = await readFile(FILE);
    if (fileData.length === 0) {
        console.log("file is empyty");
        return;
    }
    const updatedData = fileData.filter((d) => d.id !== id);
    const response = await writeFile(FILE, JSON.stringify(updatedData, null, 2));
    console.log(response.status);
}
deteleFileData(2);