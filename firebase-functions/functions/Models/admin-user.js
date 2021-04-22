/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  uname: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("admin-user", adminUserSchema);
