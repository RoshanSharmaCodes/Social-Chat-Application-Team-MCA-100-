const mongoose = require("mongoose");
const loginSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
        default: Date.now
    }
})
const LoginModel = mongoose.model("LoginDetails", loginSchema);
module.exports = LoginModel;