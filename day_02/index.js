import fs from 'fs';
const writeFileSync = (path, data) => {
    try {
        fs.writeFileSync(path, data);
        console.log("File Has been created successfully");
    } catch (error) {
        console.log("Some Error occured...");
    }
}
const readFileSync = (path) => {
    try {
        const data = fs.readFileSync(path,'utf-8');
        console.log(data);
    } catch (error) {
        console.log("Some Error occured...");
    }
}
const appendFileSync = (path, data) => {
    try {
        fs.appendFileSync(path,data);
        console.log("File Has been appended successfully");
    } catch (error) {
        console.log("Some Error occured...");
    }
}
console.log("Before write");
writeFileSync("./example.txt", "This is the data written through sync func:'writeFileSync'")
console.log("after write");

console.log("Before read");
readFileSync("./example.txt");
console.log("after read");

console.log("Before append");
appendFileSync("./example.txt","This is the data written throygh sync function:'appendFileSync'");
console.log("after append");