const express = require("express");
const router = express.Router();
const LoginModel = require("F:/React/REST API/Models/loginModel.jsx");


//To Get all data
router.get("/", async (req, res) => {
    try {
        const users = await LoginModel.find();
        return res.status(201).json(users)

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})


//To get Specific Id
//here checkUser Will Work as Middleware
router.get("/:id", checkUser, (req, res) => {
    res.json(res.user);
})


//To Update:
//put method update all the fields
//patch method only updates the value   
router.patch("/:id", checkUser, async (req, res) => {
    try {
        if (req.body.name != null) {
            res.user.name = req.body.name;
        }
        if (req.body.username != null) {
            res.user.username = req.body.name;
        }
        if (req.body.pass != null) {
            res.user.pass = req.body.name;
        }
        const newuser = await res.user.save();
        return res.status(201).json({ message: "User Updated Successfully!" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})


//To Create
router.post("/", async (req, res) => {
    const user = new LoginModel({
        name: req.body.name,
        username: req.body.username,
        pass: req.body.password
    })

    try {
        const newUser = await user.save();
        return res.status(201).json(newUser);
    }
    catch (err) {
        return res.status(500).json({ message: err.message});
    }

})

//To Delete
router.delete("/:id", checkUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "User Deleted Successfully!" });
    } catch (err) {
        res.send(500).json({message:"This is on us!"})
    }
})


//Defining a MiddleWare which will check whether the user exist or not, if yes then next()
async function checkUser(req,res,next){
    var user;
    try {
        user = await LoginModel.findbyId(req.params.id);
        if (user == null){
            return res.status(400).json({message: 'Cannot Find Data'});
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user;
    next();
}
module.exports = router;