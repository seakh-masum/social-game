const router = require("express").Router();
const studentDetail = require("../Models/student-details");
const validation = require("../Service/validation");

// Student Details
router.put("/student-details/:_id", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  if (JSON.stringify(req.body) != "{}") {
    if (req.body.name == "") {
      resType["Message"] = "Student's Name is Required";
      return res.status(400).send(resType);
    } else if (req.body.roll == "") {
      resType["Message"] = "Student's Roll is Required";
      return res.status(400).send(resType);
    } else if (req.body.phone == null) {
      resType["Message"] = "Student's Phone Number is Required";
      return res.status(400).send(resType);
    } else if (req.body.pin == null) {
      resType["Message"] = "Pin Code is Required";
      return res.status(400).send(resType);
    } else if (req.body.course == "") {
      resType["Message"] = "Course is Required";
      return res.status(400).send(resType);
    } else if (req.body.stream == "") {
      resType["Message"] = "Stream is Required";
      return res.status(400).send(resType);
    } else if (req.body.college == "") {
      resType["Message"] = "College is Required";
      return res.status(400).send(resType);
    } else {
      if (JSON.stringify(req.body.phone).length != 10) {
        resType["Message"] = "Phone Number is not valid";
        return res.status(400).send(resType);
      } else if (JSON.stringify(req.body.pin).length != 6) {
        resType["Message"] = "PIN code is not valid";
        return res.status(400).send(resType);
      } else {
        if (validation(req.body.email)) {
          const updatedData = await studentDetail.findByIdAndUpdate(
            { _id: req.params._id },
            req.body,
            async (err, params) => {
              if (err) {
                resType["Message"] = err.message;
                return res.status(400).send(resType);
              }
            }
          );
          if (!updatedData) {
            resType["Message"] = "Student Details is not Present in DataBase";
            return res.status(400).send(resType);
          }
          try {
            resType["Data"] = [updatedData];
            resType["Status"] = true;
            resType["Message"] = "Student Details is Updated Successfully";
            return res.status(200).send(resType);
          } catch (err) {
            resType["Message"] = err.message;
            return res.status(400).send(resType);
          }
        }
        resType["Message"] = "Email is not Valid";
        return res.status(400).send(resType);
      }
    }
  }
  resType["Message"] = "Please Insert Details";
  return res.status(400).send(resType);
});

module.exports = router;
