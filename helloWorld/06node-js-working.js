const fs = require("fs");

//This is used to check the thread in the pc--------
// const os = require("os");
// console.log(os.cpus().length);

//Blocking request
console.log("1")
const result = fs.readFileSync("./node-working.txt","utf-8")
console.log(result);
console.log("2")

// Non-blocking request
console.log('1')
fs.readFile("./node-working.txt", "utf-8", (err, result) => {
    console.log(result);
})
console.log('2')