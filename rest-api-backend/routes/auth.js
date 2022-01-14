const auth = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//Register User
auth.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username = req.body.username,
            email = req.body.email,
            password = hashpassword
        })

        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


//Login
auth.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email })
        if (!user) {
            req.status(404).json("User Not Found");
        }
        else {
            const validPass = bcrypt.compare(password, user.password);
            if (validPass) {
                res.status(200).json(user);
            }
            else {
                res.status(400).json("Wrong Password! Try Again.");
            }
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = auth;