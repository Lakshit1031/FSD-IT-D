import fs from 'fs/promises';
const writeFile = async (path, data) => {
    try {
        await fs.writeFile(path, data);
        console.log("file has been written successfully");
    } catch (error) {
        console.log("Some error occured");
    }
}
const readFile = async (path) => {
    try {
        const data = await fs.readFile(path, "utf-8");
        console.log(data);
    } catch (error) {
        console.log("unable to read data");
    }
}
const appendFile = async (path,data) => {
    try {
        await fs.appendFile(path, data);
        console.log("Data has been appended successfully...");
    } catch (error) {
        console.log("Unable to append data");
    }
}
console.log("Before write");
writeFile("./example2.txt","This is the data written through async func:'writeFile()'")
console.log("after write");

console.log("Before read");
readFile("./example2.txt");
console.log("after read");

console.log("Before append");
appendFile("./example2.txt","This is the data appended through async function")
console.log("after append");