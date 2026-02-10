import fs from "fs";

const writeFile =  (data, path) => {
    fs.writeFile(path, data, (error) => {
       if(error){
        console.error("error")
       }else{
        console.log("successfully");       
       }
    })
}
const readFile =  (path) => {
     fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            console.log("Unable to read File");
        } else {
            console.log(data);  
        }
    })
}
const appendFile =  (data, path) => {
     fs.appendFile(path, data, (error) => {
        if (error) console.log("Unable to append");
        else console.log("data has been appended successfully...");
    })
}
console.log("before write");
writeFile("This is data wriiten by async function:'writeFile()'", "example2.txt");
console.log("after write");

console.log("before read");
readFile("example2.txt");
console.log("after read");

console.log("before append");
appendFile("appended data","example2.txt");
console.log("after append");