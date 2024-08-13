const express = require("express");
const fs = require("fs");
const users = require('./MOCK_DATA.json');

const PORT = 8000;

const app = express();

//MIDDLEWARE - PLUGINS
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    fs.appendFile('./log.txt', ` \n ${Date.now()} : ${req.method} : ${req.path}`,(err,data) =>{
        next();
    })
})

//For data showing in frontend
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

//REST API
app.get("/api/users", (req, res) => {
    //Custom Headers
    res.setHeader("X-MyName", "Dhiraj Ekka")
    //Always add X to custom headers
    return res.json(users);
})

app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const userWithID = users.find((user) => user.id === id);
    if (!userWithID) return res.status(404).json({status: "user not found"})
    res.send(userWithID);
}).patch((req, res) => {
    //Edit user with id
    return res.json({ status: "Pending" });
}).delete((req, res) => {
    //Delete user with id
    return res.json({ status: "Pending" });
})

app.post("/api/users", (req, res) => {
    const body = req.body;
    //If any of this data will not find send status code of 400.
    if (!body || !body.first_name || !body.last_name || !body.email || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({status : "All field are required"})
    }
    users.push({ id: users.length + 1, ...body })
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        //changing status code for post as we need 201 for post
        return res.status(201).json({ status: "Success", id: users.length });
    })
})





app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT: ${PORT}`))