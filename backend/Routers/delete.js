const router = require("express").Router();
const studentDetail = require("../Models/student-details");

router.delete("/student-details/:_id", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  const deltedData = await studentDetail.findByIdAndDelete(
    { _id: req.params._id },
    async (err, params) => {
      if (err) {
        resType["Message"] = err.message;
        return res.status(400).send(resType);
      }
    }
  );
  if (!(await deltedData)) {
    resType["Message"] = "Student Details is not Present in DataBase";
    return res.status(400).send(resType);
  }
  try {
    resType["Status"] = true;
    resType["Message"] = "Student Details is Deleted Successfully";
    return res.status(200).send(resType);
  } catch (err) {
    resType["Message"] = err.message;
    return res.status(400).send(resType);
  }
});

module.exports = router;
