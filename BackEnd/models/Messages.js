const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  recieved: Boolean,
});

module.exports = mongoose.model("messagecontents", MessageSchema);
