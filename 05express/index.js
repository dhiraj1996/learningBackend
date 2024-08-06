const express = require('express');
// const http = require('http');

const app = express();

app.get("/", (req, res)=> {
   return res.send("Welcome to homepage")
});

app.get("/about", (req, res)=> {
   return res.send("This is your about page " + "Hey " + req.query.name)
});


app.listen(8080, ()=> console.log("Server started"))
// const myServer = http.createServer(app);
// myServer.listen(8080, ()=> console.log("Server started"));

//What is express
//Express JS is a small framework that works on top of Node web server functionality to simplify its APIs and add helpful new features. It makes it easier to organize your application’s functionality with middleware and routing. It adds helpful utilities to Node HTTP objects and facilitates the rendering of dynamic HTTP objects.

//Express gives very good structure to the code.
//Also it have all http functionality which removes lots of clutter to the code