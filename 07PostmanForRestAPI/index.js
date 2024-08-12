const express = require('express');
const fs = require("fs");
const users = require('./MOCK_DATA.json');

const PORT = 8000;

const app = express();

//MIDDLEWARE - PLUGINS
app.use(express.urlencoded({extended: false}))

app.get("/users", (req,res)=> {
    const html = `
    <ul>
        ${users.map((user) =>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

//REST API
app.get("/api/users", (req, res)=>{
    return res.json(users);
})

app.route("/api/users/:id").get((req,res) => {
    const id = Number(req.params.id);
    const userWithID = users.find((user)=> user.id === id);
    res.send(userWithID);
}).patch((req, res) => {
    //Edit user with id
    return res.json({status: "Pending"});
}).delete((req, res) => {
    //Delete user with id
    return res.json({status: "Pending"});
})

app.post("/api/users" , (req, res) => {
    const body = req.body;
    users.push({id: users.length + 1 ,...body})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "Success", id: users.length});
    })
})





app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT: ${PORT}`))