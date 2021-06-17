const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./dbMessages");
const Pusher = require("pusher");

// initialize app config
const app = express();
const port = process.env.PORT || 3000;

// Real Time DB for Mongo

const pusher = new Pusher({
  appId: "1221183",
  key: "61555feb51e255bda7c7",
  secret: "75e5d988ff3099d2a4d3",
  cluster: "us3",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});

// middleware
app.use(express.json());

// DBconfig
const mongoURI =
  "mongodb+srv://admin:j0shuadinh@cluster0.f719t.mongodb.net/Chat-App?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, console.log("we are running on" + port));
