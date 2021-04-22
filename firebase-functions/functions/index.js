/* eslint-disable linebreak-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable spaced-comment */
/* eslint-disable no-var */
/* eslint-disable linebreak-style */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
// const port = process.env.PORT || 3000;
var cors = require("cors");
// const bodyParser = require("body-parser");

admin.initializeApp(functions.firebaseConfig());

// Routes
const allPostRoute = require("./Routers/post");
const allGetRoute = require("./Routers/get");
const scheduler = require("./Scheduler/push-notification");

//Environment Setup
dotEnv.config();

// Connect Mongoose
mongoose.connect(
  "mongodb+srv://SkSayon:SkSayon@1998@sk-sayon.bzca7.mongodb.net/SkSayon?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to MongoDB")
);

// parse application/json
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

// Router Middleware
app.use("/api", allPostRoute);
app.use("/api", allGetRoute);
app.use("/scheduler", scheduler);

// res.set("Cache-control", "public,max-age=300,s-maxage=600");
// app.listen(port, function () {
//   console.log("Server is running on port " + port);
// });

exports.app = functions.https.onRequest(app);
