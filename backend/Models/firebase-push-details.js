const mongoose = require("mongoose");

const pushSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  endpoints: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("pushDetails", pushSchema);
