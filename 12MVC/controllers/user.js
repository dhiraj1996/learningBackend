
const User = require("../models/user")

async function handleGetAllUsers (req, res) {
    const allDbUser = await User.find({});
    return res.json(allDbUser);
}

async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({status: "user not found"})
    res.send(user);
}

async function handleUpdateUserById(req, res){
    //Edit user with id
    await User.findByIdAndUpdate((req.params.id),{lastName: "Changed"})
    return res.json({ status: "Sucessfully Changed" });
}

async function handleDeleteUserById(req, res){
    //Delete user with id 
    await User.findByIdAndDelete((req.params.id))
    return res.json({ status: "Deleted Successfully",  });
}

async function handleCreateNewUser(req, res){
    const body = req.body;
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

    return res.status(201).json({status : "Success",
                                    id: result._id,
                                    msg: `${result.firstName} data inserted successfully`},)
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}