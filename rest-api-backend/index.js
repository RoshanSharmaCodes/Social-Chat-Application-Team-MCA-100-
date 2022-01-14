const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const env = require("dotenv").config();
const helmet = require("helmet");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/post.js");
const app = express();


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTechnology: true }, () => {
    console.log("Connected to MongoDB");
})

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);


//MiddleWares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.listen(8800, () => {
    console.log("Backend server is running!");
})