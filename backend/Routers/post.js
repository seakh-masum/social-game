const router = require("express").Router();
const userDetails = require("../Models/user-details");
const messages = require("../Models/messages");
const deviceInfo = require("../Models/device-details");
const jwt = require("jsonwebtoken");
const jwtTokenVerify = require("../Service/jwt-token-verify");
const btoa = require("btoa");

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
  try {
    let checkname = req.body.username.split(" ").join("");
    const prevData = await userDetails.findOne({ username: checkname });
    if (prevData) {
      let username = "";
      if (req.body.username.includes(" ")) {
        username =
          req.body.username.split(" ").join("") +
          Math.random().toString(36).substring(7);
      } else {
        username = req.body.username + Math.random().toString(36).substring(7);
      }
      const afterUserNameSet = await userDetails.findOne({
        username: username,
      });
      if (afterUserNameSet) {
        let username = "";
        if (req.body.username.includes(" ")) {
          username =
            req.body.username.split(" ").join("") +
            Math.random().toString(36).substring(7);
        } else {
          username =
            req.body.username + Math.random().toString(36).substring(7);
        }
      }
      const token = jwt.sign(
        { _id: username, role: req.body.role },
        process.env.TOKEN_SECRET,
        {
          issuer: "unimansyst@gmail.com",
          audience: username,
        }
      );
      const saveDetails = new userDetails({
        username: username,
        displayname: req.body.username,
        role: req.body.role,
        token: token,
        link:
          "https://socail-game.web.app/secret-message/view/" + btoa(username),
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
    } else {
      let username = "";
      if (req.body.username.includes(" ")) {
        username = req.body.username.split(" ").join("");
      } else {
        username = req.body.username;
      }
      const token = jwt.sign(
        { _id: username, role: req.body.role },
        process.env.TOKEN_SECRET,
        {
          issuer: "sayonchakraborty1998@gmail.com",
          audience: username,
        }
      );
      const saveDetails = new userDetails({
        username: username,
        displayname: req.body.username,
        role: req.body.role,
        token: token,
        link: "https://socail-game.web.app/" + btoa(username),
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
  } catch (err) {
    resType["Message"] = err.message;
    return res.status(400).send(resType);
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
    try {
      const userData = await userDetails.findOne({ _id: req.body.userid });
      if (userData) {
        const Data = await messages.findOne({ userid: req.body.userid });
        // console.log(Data);
        if (Data) {
          await messages.findOneAndUpdate(
            { _id: Data._id },
            {
              message: Data.message + "_" + req.body.message + "|" + new Date(),
            },
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
      } else {
        resType["Message"] = "Username is not Valid";
        return res.status(400).send(resType);
      }
    } catch (err) {
      resType["Message"] = err.message;
      return res.status(400).send(resType);
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
    try {
      const userData = await userDetails.findOne({
        username: req.body.username,
      });
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
