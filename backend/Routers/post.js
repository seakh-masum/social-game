const router = require("express").Router();
const userDetails = require("../Models/user-details");
const messages = require("../Models/messages");
const deviceInfo = require("../Models/device-details");
const jwt = require("jsonwebtoken");
const jwtTokenVerify = require("../Service/jwt-token-verify");
const btoa = require("btoa");
const puppeteer = require("puppeteer");

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
        // let username = "";
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
        link: "secret-message/share-link/" + btoa(username),
        encyptduser: btoa(username),
        userpin: (Math.random() * 1000000).toFixed(),
        longitude: "",
        latitude: "",
      });
      try {
        resType[
          "Message"
        ] = `${saveDetails.displayname} is Register Successfully`;
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
        link: "secret-message/share-link/" + btoa(username),
        encyptduser: btoa(username),
        userpin: (Math.random() * 1000000).toFixed(),
        longitude: "",
        latitude: "",
      });
      try {
        resType[
          "Message"
        ] = `${saveDetails.displayname} is Register Successfully`;
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
        const htmlString = `<html>
            <head>
              <title></title>
              <style>
                /* General CSS Setup */
                body {
                  background-color: lightblue;
                  font-family: "Ubuntu-Italic", "Lucida Sans", helvetica, sans;
                }

                /* container */
                .container {
                  padding: 5% 5%;
                }

                /* CSS talk bubble */
                .talk-bubble {
                  display: inline-block;
                  position: relative;
                  width: 95%;
                  height: 95%;
                  background-color: lightyellow;
                  left: 2%;
                  top: 2%;
                }
                .border {
                  border: 8px solid #666;
                }
                .round {
                  border-radius: 30px;
                  -webkit-border-radius: 30px;
                  -moz-border-radius: 30px;
                }
                .tri-right.border.btm-left:before {
                  content: " ";
                  position: absolute;
                  width: 0;
                  height: 0;
                  left: -8px;
                  right: auto;
                  top: auto;
                  bottom: -40px;
                  border: 32px solid;
                  border-color: transparent transparent transparent #666;
                }
                .tri-right.btm-left:after {
                  content: " ";
                  position: absolute;
                  width: 0;
                  height: 0;
                  left: 0px;
                  right: auto;
                  top: auto;
                  bottom: -20px;
                  border: 22px solid;
                  border-color: transparent transparent transparent lightyellow;
                }
                /* talk bubble contents */
                .talktext {
                  padding: 1em;
                  text-align: left;
                  line-height: 1.5em;
                  text-align: center;
                  font-size: xx-large;
                  font-weight: bold;
                }
                .talktext p {
                  /* remove webkit p margins */
                  -webkit-margin-before: 0em;
                  -webkit-margin-after: 0em;
                }
              </style>
            </head>
            <body>
              <div class="talk-bubble tri-right border round btm-left-in">
                <div class="talktext">
                  <p>${req.body.message}</p>
                </div>
              </div>
            </body>
          </html>`;
        let page,
          path = `assests/${
            new Date().getTime() + new Date().getMilliseconds()
          }.png`;
        (async () => {
          const browser = await puppeteer.launch();
          page = await browser.newPage();
          await page.setContent(htmlString);
          await page.screenshot({ path: path });
          await browser.close();
        })();
        const imageLink = `${
          req.headers.host.includes(":3000")
            ? "http://" + req.headers.host
            : "https://" + req.headers.host
        }/images/${path}`;
        if (Data) {
          await messages.findOneAndUpdate(
            { _id: Data._id },
            {
              message:
                Data.message +
                "_" +
                req.body.message +
                "|" +
                new Date() +
                "#messageimagelink:" +
                imageLink,
              longitude: req.body.longitude
                ? Data.longitude + "#" + req.body.longitude
                : Data.longitude + "#" + "No Data Found",
              latitude: req.body.latitude
                ? Data.latitude + "#" + req.body.latitude
                : Data.latitude + "#" + "No Data Found",
              browser: Data.browser + "#" + req.body.browser,
              browser_version:
                Data.browser_version + "#" + req.body.browser_version,
              device: Data.device + "#" + req.body.device,
              deviceType: Data.deviceType + "#" + req.body.deviceType,
              orientation: Data.orientation + "#" + req.body.orientation,
              os: Data.os + "#" + req.body.os,
              os_version: Data.os_version + "#" + req.body.os_version,
              userAgent: Data.userAgent + "#" + req.body.userAgent,
              ip: Data.ip + "#" + req.body.ip,
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
            message:
              req.body.message +
              "|" +
              new Date() +
              "#messageimagelink:" +
              imageLink,
            longitude: req.body.longitude
              ? req.body.longitude
              : "No Data Found",
            latitude: req.body.latitude ? req.body.latitude : "No Data Found",
            browser: req.body.browser,
            browser_version: req.body.browser_version,
            device: req.body.device,
            deviceType: req.body.deviceType,
            orientation: req.body.orientation,
            os: req.body.os,
            os_version: req.body.os_version,
            userAgent: req.body.userAgent,
            ip: req.body.ip,
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
  if (!req.body.userpin) {
    resType["Message"] = "User's pin is Required";
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
      if (
        userData.userpin &&
        req.body.userpin &&
        userData.userpin != req.body.userpin
      ) {
        resType["Message"] = "Your pin is Incorrect";
        return res.status(400).send(resType);
      } else if (
        userData.userpin &&
        req.body.userpin &&
        userData.userpin === req.body.userpin
      ) {
        resType["Status"] = true;
        resType["Message"] = `${userData.displayname} is Successfully login`;
        resType["Data"] = [
          {
            _id: userData._id,
            username: userData.username,
            displayname: userData.displayname,
            token: userData.token,
            link: userData.link,
            encyptduser: userData.encyptduser,
            longitude: userData.longitude,
            latitude: userData.latitude,
            date: userData.date,
          },
        ];
        return res.status(200).send(resType);
      } else {
        resType["Message"] = "User's pin is not set in our Database";
        return res.status(400).send(resType);
      }
    } catch (err) {
      resType["Message"] = err.message;
      return res.status(400).send(resType);
    }
  } else {
    resType["Message"] = "User's role is not set properly";
    return res.status(400).send(resType);
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
            ip: req.body.ip,
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
                ip: deviceDetails.ip + "#" + req.body.ip,
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
router.post(
  "/change-userpin",
  jwtTokenVerify.isAuthenticated,
  async (req, res) => {
    const resType = {
      Status: false,
      Data: [],
      Message: "",
    };
    try {
      if (!req.body.userpin) {
        resType["Message"] = "User's Pin is Required";
        return res.status(400).send(resType);
      }
      if (!req.body.username) {
        resType["Message"] = "Username is Required";
        return res.status(400).send(resType);
      }
      if (
        req.body.userpin &&
        (req.body.userpin.length > 6 || req.body.userpin.length < 6)
      ) {
        resType["Message"] = "User's Pin should be Six length";
        return res.status(400).send(resType);
      }
      await userDetails.findOneAndUpdate(
        { username: req.body.username },
        { userpin: req.body.userpin },
        async (err, params) => {
          if (err) {
            resType["Message"] = err.message;
            return res.status(400).send(resType);
          }
          if (!params) {
            resType["Message"] = "Username is not valid";
            return res.status(400).send(resType);
          }
          resType["Message"] = "User's Pin is edited successfully";
          resType["Status"] = true;
          return res.status(200).send(resType);
        }
      );
    } catch (err) {
      resType["Message"] = err.message;
      return res.status(400).send(resType);
    }
  }
);

module.exports = router;
