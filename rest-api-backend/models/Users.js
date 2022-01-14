const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 8,
    },
    profilePic: {
        type: String,
        default: ""
    },
    coverPic: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
        max:20
    },
    relation: {
        type: Number,
        enum: [1,2,3]
    },
    desc: {
        type: String,
        max: 50,
    },
    nation: {
        type: String,
        max:30
    }
}, { timestamps:true });

module.exports = mongoose.model("User", UserSchema);
