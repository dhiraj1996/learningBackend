const fs = require("fs");

// //For creating file
// //sync
// fs.writeFileSync("./dhiraj.txt", "hello Dhiraj");

// //async way to create file and it also take a callback of error if any error occurs it will come to err CB.
// fs.writeFile("./dhiraj.txt", "hello node", (err) =>{})


////Reading Files////////////////////////////
// //For reading file synchronously
// //This is normal txt file so we are using utf-8 to decode for video and image this will be different.
// const result = fs.readFileSync('./dhiraj.txt', 'utf-8');
// console.log(result);

// //async it take callback and show result 
// fs.readFile('./dhiraj.txt', 'utf-8' , (err, result)=> {
//     if(err){
//         console.log("Error", err);
//     }else {
//         console.log(result);
//     }
// })


// //To add append data in existing file --------------------
// //or for date 
// fs.appendFileSync('./dhiraj.txt', `${new Date().getDay()} \n`); 
// //


// //To make a copy of the file cpSync....---------------
// fs.cpSync("./dhiraj.txt", "./dhirajcopy.txt");


// // To delete file.. unlinck or unlinkSync is used---------
// fs.unlinkSync("./dhirajcopy.txt")


// //To see the detail or stats of the file-----------
// console.log(fs.statSync("./dhiraj.txt"));


// //to see the file is present or not .isFile is used------
// console.log(fs.statSync("./dhiraj.txt").isFile());

// //To make new folder we use mkdir
// fs.mkdirSync("new-docs");

//So we can't all this operation in JS due to security purpose this is only we can do in node..