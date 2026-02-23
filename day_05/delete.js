import { readFile, writeFile } from "../day_04/ReadandWrite.js";
const FILE = "./students.json";
let fileData = null;

const deleteFileData = async(id) => {
    if(!fileData){
        console.log("File is empty");
        return;
    }
    const updateData = fileData.filter((d) => d.id !== id);
    const response = await writeFile(FILE, JSON.stringify(updateData));
    console.log(response.status);
}
deleteFileData(2);