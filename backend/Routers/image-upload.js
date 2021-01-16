const router = require("express").Router();
const studentDetail = require("../Models/student-details");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dzruu87x0",
  api_key: "533295136419779",
  api_secret: "gQqWETaT7kgiFm8UvibmbZjmuQo",
});
router.post("/image-upload", async (req, res) => {
  const file = req.files.photo;
  console.log(file);
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    if (err) {
      res.send({ Status: false });
    }
    res.send({ public_id: result.public_id, url: result.url });
  });
});
module.exports = router;
