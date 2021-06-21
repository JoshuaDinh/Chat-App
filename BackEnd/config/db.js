const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("mongoDB Connected");
  } catch (err) {
    console.error(err.message);
    // Exit Process With Failure
    process.exit(1);
  }
};

module.exports = connectDB;

// db.once("open", () => {
//   console.log("db connected");
//   const msgCollection = db.collection("messagecontents");
//   const changeStream = msgCollection.watch();

//   changeStream.on("change", (change) => {
//     if (change.operationType === "insert") {
//       const messageDetails = change.fullDocument;
//       pusher.trigger("messages", "inserted", {
//         name: messageDetails.name,
//         message: messageDetails.message,
//         timestamp: messageDetails.timestamp,
//       });
//     } else {
//       console.error(err.msg);
//     }
//   });
// });

// Real Time DB for Mongo

// const pusher = new Pusher({
//   appId: "1221183",
//   key: "61555feb51e255bda7c7",
//   secret: "75e5d988ff3099d2a4d3",
//   cluster: "us3",
//   useTLS: true,
// });
