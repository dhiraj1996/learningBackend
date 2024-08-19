const express = require("express");
const {handleConnection} = require("./connection");

const urlRoutes = require("./routes/url")

const PORT = 8001;

const app = express();

//CONNECTION
handleConnection("mongodb://127.0.0.1:27017/urlShortener")
.then(()=> console.log("MongoDb connected"));

app.use(express.json());
//Routes
app.use("/url", urlRoutes)

app.listen(PORT, ()=> console.log(`YOUR SERVER IS RUNNING ON ${PORT}`))