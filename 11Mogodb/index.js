const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose")
// const users = require('./MOCK_DATA.json');
// const { type } = require("os");

const app = express();
const PORT = 8000;

//Mongodb Connection
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(() => console.log("MONGO CONNECTED"))
.catch(err => console.log("Mongo Error : ", err))



//Schema
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle : {
        type: String,
    },
    gender: {
        type: String,
    }
},{timestamps : true} //This is used to add time in user
);

//Model
const User = mongoose.model("user", userSchema);

//MIDDLEWARE - PLUGINS
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    fs.appendFile('./log.txt', ` \n ${Date.now()} : ${req.method} : ${req.path}`,(err,data) =>{
        next();
    })
})

//For data showing in frontend
app.get("/users", async (req, res) => {
    const allDbUser = await User.find({});  //find({}) use to add all users in db.
    const html = `
    <ul>
        ${allDbUser.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

//REST API
app.get("/api/users", async (req, res) => {
    const allDbUser = await User.find({});
    return res.json(allDbUser);
})

app.route("/api/users/:id").get(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({status: "user not found"})
    res.send(user);
}).patch((req, res) => {
    //Edit user with id
    return res.json({ status: "Pending" });
}).delete((req, res) => {
    //Delete user with id 
    return res.json({ status: "Pending" });
})

app.post("/api/users",async (req, res) => {
    const body = req.body;
    //If any of this data will not find send status code of 400.
    if (!body || !body.first_name || !body.last_name || !body.email || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({status : "All field are required"})
    }
    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })

    console.log("Result", result);

    return res.status(201).json({msg : "Success"})
})





app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT: ${PORT}`))