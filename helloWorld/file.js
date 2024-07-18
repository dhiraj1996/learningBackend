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


//To append data in file --------------------
//or for date 
fs.appendFileSync('./dhiraj.txt', `${new Date().getDay()} \n`); 
//