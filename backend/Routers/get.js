const router = require("express").Router();
const jwtTokenVerify = require("../Service/jwt-token-verify");
const messages = require("../Models/messages");
const userDetails = require("../Models/user-details");
// Message Details By Username
router.get(
  "/message-details/:_id",
  jwtTokenVerify.isAuthenticated,
  async (req, res) => {
    const resType = {
      Status: false,
      Data: [],
      Message: "",
    };
    try {
      await messages.findOne(
        { userid: req.params._id },
        async (err, params) => {
          if (err) {
            resType["Message"] = err.message;
            return res.status(400).send(resType);
          }
          if (params === null) {
            resType["Status"] = true;
            resType["Message"] = "You have no message yet";
            return res.status(200).send(resType);
          }
          if (params.messagedetails.findIndex((x) => x.seen == false) > -1) {
            var arrayData = [];
            arrayData = params.messagedetails;
            params.messagedetails = [];
            arrayData.forEach(async (element) => {
              await params.messagedetails.push({
                message: element.message,
                date: element.date,
                seen: true,
                base64image: element.base64image,
                longitude: element.longitude,
                latitude: element.latitude,
                browser: element.browser,
                browser_version: element.browser_version,
                device: element.device,
                deviceType: element.deviceType,
                orientation: element.orientation,
                os: element.os,
                os_version: element.os_version,
                userAgent: element.userAgent,
                ip: element.ip,
              });
            });
            await params.save();
          }
          resType["Status"] = true;
          resType["Message"] = "Successful";
          resType["Data"] = [params];
          return res.status(200).send(resType);
        }
      );
    } catch (err) {
      resType["Message"] = err.message;
      return res.status(400).send(resType);
    }
  }
);
router.get("/search-user/:searchdata", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  try {
    await userDetails.find({}, async (err, params) => {
      if (err) {
        resType["Message"] = err.message;
        return res.status(400).send(resType);
      }
      if (params.findIndex((x) => x.username == req.params.searchdata) != -1) {
        resType["Message"] = "Username is not available";
        return res.status(400).send(resType);
      }
      try {
        resType["Status"] = true;
        resType["Message"] = "Username is available";
        return res.status(200).send(resType);
      } catch (err) {
        resType["Message"] = err.message;
        return res.status(400).send(resType);
      }
    });
  } catch (err) {
    resType["Message"] = err.message;
    return res.status(400).send(resType);
  }
});
router.get("/user-details/:username", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  // const userName = req.userNameFromJWT;
  try {
    await userDetails.findOne(
      { username: req.params.username },
      async (err, params) => {
        if (err) {
          resType["Message"] = err.message;
          return res.status(400).send(resType);
        }
        if (!params) {
          resType["Message"] = "User is not Registered";
          return res.status(200).send(resType);
        }
        try {
          resType["Data"] = [params];
          resType["Message"] = "Successful";
          resType["Status"] = true;
          return res.status(200).send(resType);
        } catch (err) {
          resType["Message"] = err.message;
          return res.status(400).send(resType);
        }
      }
    );
  } catch (err) {
    resType["Message"] = err.message;
    return res.status(400).send(resType);
  }
});
module.exports = router;
