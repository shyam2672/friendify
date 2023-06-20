const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const userModel = require()
const bodyParser = require("body-parser");
const User = require("./models/userModel");
const socket = require("socket.io");
const uniqueID = require("uniqid");
require("dotenv").config();
const messageRoutes = require("./routes/messages");

const authRoutes = require("./routes/userRoutes");


module.exports.makeapp=()=>{
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
// console.log('fff');

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);





return app;
}


