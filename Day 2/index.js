const fs= require("fs");
const data= fs.readFileSync("./data.json","utf-8");
console.log(data);
setTimeout(()=>{
     console.log("Hello after 2 seconds");
},2000)
console.log("End of the File");