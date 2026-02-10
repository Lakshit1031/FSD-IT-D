import { fileStatus } from "./sevices.js";
const useFileStats = async(path)=>{
   const stats = await fileStatus(path);
   console.log(stats.size); 
   console.log(stats.isFile());
   console.log(stats.isDirectory());
}
useFileStats("./sevices.js")