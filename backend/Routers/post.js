const router = require("express").Router();
const studentDetail = require("../Models/student-details");
const userDetails = require("../Models/user-details");
const messages = require("../Models/messages");
const deviceInfo = require("../Models/device-details");
const validation = require("../Service/validation");
const request = require("request");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jwtTokenVerify = require("../Service/jwt-token-verify");
const btoa = require("btoa");

// Student Details Insert
router.post("/student-details", async (req, res) => {
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
      if (JSON.stringify(req.body.phone).length != 12) {
        resType["Message"] = "Phone Number is not valid";
        return res.status(400).send(resType);
      } else if (JSON.stringify(req.body.pin).length != 8) {
        resType["Message"] = "PIN code is not valid";
        return res.status(400).send(resType);
      } else {
        if (validation(req.body.email)) {
          var public_id = "",
            url = "";
          if (req.files.photo != undefined) {
            console.log(req.files.photo);
            const options = {
              method: "POST",
              url: "http://localhost:3000/api/image-upload",
              port: 443,
              headers: {
                "Content-Type": "multipart/form-data",
              },
              formData: {
                photo: fs.createReadStream(req.files.photo.tempFilePath),
              },
            };
            await request(options, async function (error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log(JSON.parse(response.body));
                const imageData = JSON.parse(response.body);
                public_id = imageData["public_id"];
                url = imageData["url"];
              } else {
                public_id = "";
                url = "";
              }
            });
          }
          const studentData = new studentDetail({
            name: req.body.name,
            roll: req.body.roll,
            publicid: public_id,
            imageurl: url,
            regno: req.body.regno,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            pin: req.body.pin,
            course: req.body.course,
            stream: req.body.stream,
            college: req.body.college,
          });
          try {
            resType["Data"] = [await studentData.save()];
            resType["Status"] = true;
            resType["Message"] = "Student Details is Inserted Successfully";
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
// Save User Name with Id & Token
router.post("/savedetails", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  if (!req.body.username) {
    resType["Message"] = "User's Name is Required";
    return res.status(400).send(resType);
  }
  if (!req.body.role) {
    resType["Message"] = "User's Role is Required";
    return res.status(400).send(resType);
  }
  const prevData = await userDetails.findOne({ username: req.body.username });
  if (prevData) {
    resType["Message"] = "Username is already exist";
    return res.status(400).send(resType);
  } else {
    const token = jwt.sign(
      { _id: req.body.username, role: req.body.role },
      process.env.TOKEN_SECRET,
      {
        issuer: "sayonchakraborty1998@gmail.com",
        audience: req.body.username,
      }
    );
    const saveDetails = new userDetails({
      username: req.body.username,
      role: req.body.role,
      token: token,
      link:
        "https://anonymous-ssr.herokuapp.com/sender/" + btoa(req.body.username),
      longitude: "",
      latitude: "",
    });
    try {
      resType["Message"] = "Successful";
      resType["Status"] = true;
      resType["Data"] = [await saveDetails.save()];
      return res.status(200).send(resType);
    } catch (err) {
      resType["Message"] = err.message;
      return res.status(400).send(resType);
    }
  }
});
// Save User Messages
router.post(
  "/savemessages",
  jwtTokenVerify.isAuthenticated,
  async (req, res) => {
    const resType = {
      Status: false,
      Data: [],
      Message: "",
    };
    if (!req.body.userid) {
      resType["Message"] = "User's Id is Required";
      return res.status(400).send(resType);
    }
    const Data = await messages.findOne({ userid: req.body.userid });
    // console.log(Data);
    if (Data) {
      await messages.findOneAndUpdate(
        { _id: Data._id },
        { message: Data.message + "_" + req.body.message + "|" + new Date() },
        async (err, params) => {
          if (err) {
            resType["Message"] = err.message;
            return res.status(400).send(resType);
          }
          resType["Message"] = "Successfully Message Sent";
          resType["Status"] = true;
          resType["Data"] = [params._id];
          return res.status(200).send(resType);
        }
      );
    } else {
      const messageDetails = new messages({
        userid: req.body.userid,
        message: req.body.message + "|" + new Date(),
      });
      resType["Message"] = "Successfully Message Sent";
      resType["Status"] = true;
      resType["Data"] = [(await messageDetails.save())._id];
      return res.status(200).send(resType);
    }
  }
);
// User Login
router.post("/user-login", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  if (!req.body.username) {
    resType["Message"] = "Username is Required";
    return res.status(400).send(resType);
  }
  if (req.body.role == "user") {
    const userData = await userDetails.findOne({ username: req.body.username });
    if (!userData) {
      resType["Message"] = "Username is not registered";
      return res.status(400).send(resType);
    }
    try {
      resType["Status"] = true;
      resType["Message"] = "Successful";
      resType["Data"] = [userData];
      return res.status(200).send(resType);
    } catch (err) {
      resType["Message"] = err.message;
      return res.status(400).send(resType);
    }
  }
});
// User Longitude & Latitude
router.post("/update-details", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  await userDetails.findByIdAndUpdate(
    { _id: req.body._id },
    { latitude: req.body.latitude, longitude: req.body.longitude },
    async (err, params) => {
      if (err) {
        resType["Message"] = err.message;
        return res.status(400).send(resType);
      }
      try {
        resType["Status"] = true;
        resType["Message"] = "Successful";
        resType["Data"] = [];
        return res.status(200).send(resType);
      } catch (err) {
        resType["Message"] = err.message;
        return res.status(400).send(resType);
      }
    }
  );
});
// User Device Info
router.post("/save-device-info", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  try {
    if (req.body.userid && req.body.msgid === "") {
      let deviceDetails = {};
      try {
        deviceDetails = await deviceInfo.findOne({
          userid: req.body.userid,
        });
      } catch (err) {
        resType["Message"] = err.message;
        return res.status(400).send(resType);
      }
      if (!deviceDetails) {
        try {
          await deviceInfo.create({
            userid: req.body.userid,
            msgid: "",
            browser: req.body.browser,
            browser_version: req.body.browser_version,
            device: req.body.device,
            deviceType: req.body.deviceType,
            orientation: req.body.orientation,
            os: req.body.os,
            os_version: req.body.os_version,
            userAgent: req.body.userAgent,
          });
          resType["Message"] = "Successful";
          resType["Status"] = true;
          return res.status(200).send(resType);
        } catch (err) {
          resType["Message"] = err.message;
          return res.status(400).send(resType);
        }
      } else {
        if (deviceDetails.userAgent.includes("#")) {
          let userAgent = deviceDetails.userAgent.slice(
            0,
            deviceDetails.userAgent.lastIndexOf("#")
          );
          if (userAgent != req.body.userAgent) {
            try {
              await deviceInfo.updateMany({
                browser: deviceDetails.browser + "#" + req.body.browser,
                browser_version:
                  deviceDetails.browser_version +
                  "#" +
                  req.body.browser_version,
                device: deviceDetails.device + "#" + req.body.device,
                deviceType:
                  deviceDetails.deviceType + "#" + req.body.deviceType,
                orientation:
                  deviceDetails.orientation + "#" + req.body.orientation,
                os: deviceDetails.os + "#" + req.body.os,
                os_version:
                  deviceDetails.os_version + "#" + req.body.os_version,
                userAgent: deviceDetails.userAgent + "#" + req.body.userAgent,
              });
              resType["Message"] = "Successful";
              resType["Status"] = true;
              return res.status(200).send(resType);
            } catch (err) {
              resType["Message"] = err.message;
              return res.status(400).send(resType);
            }
          } else {
            resType["Message"] = "Device details is already Exist";
            resType["Status"] = true;
            return res.status(200).send(resType);
          }
        } else {
          if (deviceDetails.userAgent != req.body.userAgent) {
            try {
              await deviceInfo.updateMany({
                browser: deviceDetails.browser + "#" + req.body.browser,
                browser_version:
                  deviceDetails.browser_version +
                  "#" +
                  req.body.browser_version,
                device: deviceDetails.device + "#" + req.body.device,
                deviceType:
                  deviceDetails.deviceType + "#" + req.body.deviceType,
                orientation:
                  deviceDetails.orientation + "#" + req.body.orientation,
                os: deviceDetails.os + "#" + req.body.os,
                os_version:
                  deviceDetails.os_version + "#" + req.body.os_version,
                userAgent: deviceDetails.userAgent + "#" + req.body.userAgent,
              });
              resType["Message"] = "Successful";
              resType["Status"] = true;
              return res.status(200).send(resType);
            } catch (err) {
              resType["Message"] = err.message;
              return res.status(400).send(resType);
            }
          } else {
            resType["Message"] = "Device details is already Exist";
            resType["Status"] = true;
            return res.status(200).send(resType);
          }
        }
      }
    } else if (req.body.userid === "" && req.body.msgid) {
      let deviceDetails = {};
      try {
        deviceDetails = await deviceInfo.findOne({ msgid: req.body.msgid });
      } catch (err) {
        resType["Message"] = err.message;
        return res.status(400).send(resType);
      }
      if (!deviceDetails) {
        try {
          await deviceInfo.create({
            userid: "",
            msgid: req.body.msgid,
            browser: req.body.browser,
            browser_version: req.body.browser_version,
            device: req.body.device,
            deviceType: req.body.deviceType,
            orientation: req.body.orientation,
            os: req.body.os,
            os_version: req.body.os_version,
            userAgent: req.body.userAgent,
          });
          resType["Message"] = "Successful";
          resType["Status"] = true;
          return res.status(200).send(resType);
        } catch (err) {
          resType["Message"] = err.message;
          return res.status(400).send(resType);
        }
      } else {
        try {
          await deviceInfo.updateMany({
            browser: deviceDetails.browser + "#" + req.body.browser,
            browser_version:
              deviceDetails.browser_version + "#" + req.body.browser_version,
            device: deviceDetails.device + "#" + req.body.device,
            deviceType: deviceDetails.deviceType + "#" + req.body.deviceType,
            orientation: deviceDetails.orientation + "#" + req.body.orientation,
            os: deviceDetails.os + "#" + req.body.os,
            os_version: deviceDetails.os_version + "#" + req.body.os_version,
            userAgent: deviceDetails.userAgent + "#" + req.body.userAgent,
          });
          resType["Message"] = "Successful";
          resType["Status"] = true;
          return res.status(200).send(resType);
        } catch (err) {
          resType["Message"] = err.message;
          return res.status(400).send(resType);
        }
      }
    }
  } catch (err) {
    resType["Message"] = err.message;
    return res.status(400).send(resType);
  }
});

module.exports = router;
