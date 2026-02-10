import fs from "fs";
//write file sync--blocking
const writeFileSync = () => {
    try {
        fs.writeFileSync("./example.txt",
            "This data is written with the help of 'writeFileSync.'");
        console.log("successfully");
        
    } catch (error) {
        console.log("Some Error occured.");

    }
}
const readFileSync = ()=>{
    try {
        const data = fs.readFileSync("./example.txt","utf-8");
        console.log(data);   
    } catch (error) {
        console.log("Unable to read File.");      
    }
}
const appendFileSync = (data)=>{
    try {
        fs.appendFileSync("./example.txt",data);
        console.log("Data has been appended successfully...");       
    } catch (error) {
        console.log("Some error occured while appending the data.");        
    }
}

console.log("before writeFileSync");
writeFileSync();
console.log("after writeFileSync");

console.log("before readFileSync");
readFileSync();
console.log("after readFileSync");

console.log("before appendFileSync");
appendFileSync("This is the appended data through 'appendFileSync()");
console.log("after appendFileSync");
