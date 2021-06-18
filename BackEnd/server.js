const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./dbMessages");
const Pusher = require("pusher");
const cors = require("cors");

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

// middleware
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "**");
//   res.setHeader("Access-Control-Allow-Headers", "**");
//   next();
// });

// DBconfig
const mongoURI =
  "mongodb+srv://admin:j0shuadinh@cluster0.f719t.mongodb.net/Chat-App?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("db connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.error(err.msg);
    }
  });
});

// api routes
// app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/api/messages/sync", (req, res) => {
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
app.listen(port, console.log("we are running on " + port));
