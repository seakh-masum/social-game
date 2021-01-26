const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const port = process.env.PORT || 3000;
const path = require("path");
const fileUpload = require("express-fileupload");
var cors = require("cors");

// Routes
const allPostRoute = require("./Routers/post");
const allGetRoute = require("./Routers/get");

//Environment Setup
dotEnv.config();

//Get Image Path
app.use("/images/:assest/:imagename", (req, res) => {
  return res.sendFile(
    path.join(__dirname + `/assests/${req.params.imagename}`)
  );
});

// Connect Mongoose
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to MongoDB")
);

// Middleware
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());
app.use(express.json());
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

app.listen(port, function () {
  console.log("Server is running on port " + port);
});
