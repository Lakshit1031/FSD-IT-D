import fs from "fs/promises";
export const fileStatus = async (path) => {
    try {
        const stats = await fs.stat(path);
        return stats;
    } catch (error) {
       console.log("unable to find status");       
    }
}
