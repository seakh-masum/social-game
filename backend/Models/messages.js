const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("messages", messageSchema);
