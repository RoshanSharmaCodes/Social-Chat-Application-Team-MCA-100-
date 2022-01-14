const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


//Create Post
router.post(":/", async (req, res) => {
    const newpost = new Post(req.body);
    try {
        const savedPost = await newpost.save();
        res.status(200).json(savedPost);
    }
    catch (err) {
        res.status(500).json(err);
    }

})

//Update a Post
router.put("/:id", async (req, res) => {

    try {
        const post = Post.findOne(req.params.id);
        if (req.body.userId === post.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post updated!");
        }
        else {
            res.status(403).json("Not authorized");
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
    
})

//Delete Post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post Deleted!");
        }
        else {
            res.status(403).json("Unauthorized!");
        }

    } catch (err) {
        res.status(500).json(err);
    }

})

//LikeAndDislike
router.put("/:id/like", async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {

            await post.updateOne({ $push: { likes: post.body.userId } });
            res.status(200).json("Post Liked!");

        }
        else {
            await post.updateOne({ $pull: { likes: post.body.userId } });
            res.status(200).json("Post Disliked!");

        }
    }
    catch (err) {
        res.status(500).json(err);
    }

})

//Get a Post
router.get("/:id", async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (err) {
        res.status(500).json(err);
    }
})


//Get Timeline Posts
router.get("/timeline/all", async (req, res) => {
    try {
        const curruser = await User.findById(req.body.userId);
        const userpost = await Post.find({ userId: curruser._id })
        const friendpost = await Promise.all(
            curruser.followings.map((friends) => {
                return Post.find({ userId: friends });
            })
        );
        res.json(userpost.concat(...friendpost));

    }
    catch (err) {

        res.status(500).json(err);
    }
})


module.export = router;