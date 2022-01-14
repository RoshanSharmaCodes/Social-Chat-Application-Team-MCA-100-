//Importing express and mongoose module
const express = require("express");
const mongoose = require("mongoose");

//This is Going to Load All the Environmental Variables
require("dotenv").config();

const app = express();
//Middleware
app.use(express.json());

//Using the Login Routes from loginRoute file.
const LoginRoute = require("./Routes/loginRoutes.jsx");
app.use("/login", LoginRoute)
app.listen(3000, () => console.log("Listening to PORT:", 3000));
//Setting Mogoose
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });

//Return the connection String
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DataBase Connected"));


