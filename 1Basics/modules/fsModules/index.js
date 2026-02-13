const fs = require('node:fs');
const filepath = "./textFile.txt";

//async manner for file reading

console.log("before reading file");
 
//asyn
// fs.readFile(filepath, "utf-8", (err, data) => {
//     console.log("---- data from file ----");
//     console.log(data.toString());
// });

//synchronous
const data = fs.readFileSync(filepath, "utf-8");
console.log(data);  

//never user both of the above methods together in the same code because it will create confusion and also it will create a problem for the performance of the code.

console.log("after reading file");