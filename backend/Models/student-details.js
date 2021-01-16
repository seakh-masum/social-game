const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  publicid: {
    type: String,
  },
  imageurl: {
    type: String,
  },
  roll: {
    type: String,
    required: true,
  },
  regno: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  pin: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("studentDetail", studentSchema);
