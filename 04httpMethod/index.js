
const http = require("http");
const fs = require("fs");
const url = require("url");


const createServer = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") return res.end(); //To removing extra in log.txt
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    const log = `New req received ${new Date().toLocaleDateString()}: ${req.method} : ${req.url} \n`

    fs.appendFile("./log.txt", log, (err, data)=> {
        switch(myUrl.pathname){
            case '/' : res.end("you are in homePage");
            break;
            case '/about' : 
            const username = myUrl.query.username;
            if(username){
                res.end(`Hello ${username}, Welcome to the website`);
            }else{
                res.end(`Hello, Welcome to the website`);
            }
            break;
            case '/signup':
                if (req.method === 'GET') res.end("This is a sigup page.")
                else if (req.method === 'POST'){
                    //Data to database
                    res.end('Success')
                    }
            break;
            case '/search':
            const searchQuery = myUrl.query.search_query;
            res.end(`You are searching for ${searchQuery}`)
            break;
            default : res.end("404Error");
        }
    } )
    
})

createServer.listen(8080, ()=> console.log("server started"))

