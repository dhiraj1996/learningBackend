const express = require('express');
const users = require('./MOCK_DATA.json');
const PORT = 8000;

const app = express();

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
    res.send(console.log("Hello"))
})

// app.get("/api/users/:id", (req,res) => {
//     const id = Number(req.params.id);
//     const userWithID = users.find((user)=> user.id === id);
//     res.send(userWithID);
// })

// app.patch("/api/users/:id", (req, res) => {
//     return res.json({status: "Pending"});
// })

// app.delete("/api/users/:id", (req, res) => {
//     //Delete user with id
//     return res.json({status: "Pending"});
// })



app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT: ${PORT}`))