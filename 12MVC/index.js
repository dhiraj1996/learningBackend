
const express = require("express");


const {connectMongoDb} = require("./connection")
const userRouter = require("./routes/user")
const {logReqRes} = require("./middlewares")

const app = express();
const PORT = 8000;

//Mongodb Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=> console.log("MongoDb Connected"));



//Schema

//Model


//MIDDLEWARE - PLUGINS
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes("log.txt"))


//Routes
app.use("/api/users", userRouter);





app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT: ${PORT}`))