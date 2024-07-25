
const http = require("http");
const fs = require("fs");
const { strict } = require("assert");

// const date = new Date();
//date.toISOString().slice(0, 10) to generate date in 2024-07-23
//date.toLocaleDateString() to generate how it is in system.

const createServer = http.createServer((req, res) => {
    const log = `${new Date().toLocaleDateString()}: ${req.url} New req received\n`

    fs.appendFile("./log.txt", log, (err, data)=> {
        switch(req.url){
            case '/' : res.end("you are in homePage");
            break;
            case '/about' : res.end("This is about me");
            break;
            default : res.end("404Error");
        }
    } )
    
})

createServer.listen(8080, ()=> console.log("server started"))