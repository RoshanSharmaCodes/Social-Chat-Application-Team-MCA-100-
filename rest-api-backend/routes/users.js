const router = require("express").Router();
const User = require("../models/Users.js");
const bcrypt = require("bcrypt");

//Update a User
router.put("/:id", async (res, req) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }

            try {

                const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
                res.status(200).json("Account Updated!")
            }
            catch (err) {
                res.status(404).json(err);
            }



        } else {

            return res.status(403).json("You can update only your profile!");

        }


    }
    catch (err) {
        res.status(500).json("Updation Failed");
    }
});



//Delete User

router.get("/:id", async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {

            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");

        }
        catch (err) {

            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("You can delete only your account!")
    }

});

//Follow user

router.put("/:id/follow", async (req, res) => {

    if (req.body.userId !== req.params.id) {

        try {

            const user = await User.findById(req.params.id);
            const curruser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {

                await user.updateOne({ $push: { followers: req.body.userId } });
                await curruser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json("You are now following this User!");
            }
            else {
                res.status(403).json("You Already Follow this User");
            }

        }
        catch (err) {
            res.status(500).json(err);
        }


    }
    else {
        res.status(403).json("you can't follow yourself");
    }

});

//Unfollow a User

router.put("/:id/follow", async (req, res) => {

    if (req.body.userId !== req.params.id) {

        try {

            const user = await User.findById(req.params.id);
            const curruser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {

                await user.updateOne({ $pull: { followers: req.body.userId } });
                await curruser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("You unfollowed this user!");
            }
            else {
                res.status(403).json("You Don't Follow this User!");
            }

        }
        catch (err) {
            res.status(500).json(err);
        }


    }
    else {
        res.status(403).json("you can't unfollow yourself");
    }

});



module.exports = router;