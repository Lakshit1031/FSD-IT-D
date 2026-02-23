import { readFile, writeFile } from "./ReadandWrite.js";

const updateFile = async(id,data,path) => {
    const fileData = await readFile(path);
    const updatedData = fileData.map((d) =>
        d.id === id ? {...d,...data} : d);
    const response = await writeFile(path, JSON.stringify(updatedData));
    console.log(response.status);
}
updateFile(1,{name:"E"}, "./students.json");


//     let updatedData = JSON.parse(fileData);
//     updatedData = updatedData.map(item => {
//         if(item.id === id) {
//             return {...item,...data}
//         }
//         return item;
//     })
//     const response = await writeFile(path, JSON.stringify(updatedData));
//     console.log(response.status);
// }



const fileData = async (path) => {
    try {
        const data = await readFile(path);
        console.log(data);
    } catch (error) {
        console.log("service is not working...");
    }
}
// fileData("./students.json");
// writeData("./students.json",`{id:4,name:"D"}`);
const writeData = async (path, data) => {
    const fileData = await readFile(path);
    let updatedData = [];
    if (!fileData) {
        updatedData = [{id:1,...data}]
    } else {
        let oldData = JSON.parse(fileData);
        updatedData = [...oldData, {id:oldData.length +1 ,...data}]
    };
    const response = await writeFile(path, JSON.stringify(updatedData));
    console.log(response.status);
}
writeData("./students.json", {name: "B" });