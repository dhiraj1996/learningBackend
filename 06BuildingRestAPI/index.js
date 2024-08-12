const express = require('express');
const users = require('./MOCK_DATA.json');
const PORT = 8000;

const app = express();

app.get("/api/users", (req, res)=>{
    return res.json(users);
})

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT: ${PORT}`))