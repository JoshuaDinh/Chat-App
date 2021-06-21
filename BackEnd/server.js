const express = require("express");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const cors = require("cors");

// initialize app config
const app = express();
connectDB();
const port = process.env.PORT || 3000;

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// api routes
// app.get("/", (req, res) => res.status(200).send("hello world"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// listen
app.listen(port, console.log("we are running on " + port));
