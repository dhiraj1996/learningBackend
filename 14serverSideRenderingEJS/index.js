const express = require("express");
const path = require("path")
const {handleConnection} = require("./connection");

const URL = require("./models/url");


const urlRoutes = require("./routes/url")
const staticRoute = require("./routes/staticRoutes")

const PORT = 8001;

const app = express();

//CONNECTION
handleConnection("mongodb://127.0.0.1:27017/urlShortener")
.then(()=> console.log("MongoDb connected"));

// set the view engine to ejs
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}))


//Routes
app.use("/url", urlRoutes)

// app.get("/test", async (req, res)=>{
//     const allUsers = await URL.find({});
//     return res.render("home", {
//         urls: allUsers,
//     })
// })
app.use("/", staticRoute);

app.listen(PORT, ()=> console.log(`YOUR SERVER IS RUNNING ON ${PORT}`))