const router = require("express").Router();
const jwtTokenVerify = require("../Service/jwt-token-verify");
const messages = require("../Models/messages");
const userDetails = require("../Models/user-details");

router.get(
  "/message-details/:_id",
  jwtTokenVerify.isAuthenticated,
  async (req, res) => {
    const resType = {
      Status: false,
      Data: [],
      Message: "",
    };
    const userMessages = await messages.findOne({ userid: req.params._id });
    if (!userMessages) {
      resType["Message"] = "You have no messages yet";
      return res.status(200).send(resType);
    }
    try {
      const messageSplit = userMessages["message"].split("_");
      const messageDetails = [];
      for (let i = 0; i < messageSplit.length; i++) {
        messageDetails.push({
          message: messageSplit[i].split("|")[0],
          date: messageSplit[i].split("|")[1].split("#messageimagelink:")[0],
          messageimagelink: messageSplit[i].split("#messageimagelink:")[1],
          // ip: userMessages["ip"].split("#")[i],
          // longitude: userMessages["longitude"].split("#")[i],
          // latitude: userMessages["latitude"].split("#")[i],
          // browser: userMessages["browser"].split("#")[i],
          // browser_version: userMessages["browser_version"].split("#")[i],
          // device: userMessages["device"].split("#")[i],
          // deviceType: userMessages["deviceType"].split("#")[i],
          // orientation: userMessages["orientation"].split("#")[i],
          // os: userMessages["os"].split("#")[i],
          // os_version: userMessages["os_version"].split("#")[i],
          // userAgent: userMessages["userAgent"].split("#")[i],
        });
      }
      resType["Message"] = "Successful";
      resType["Status"] = true;
      resType["Data"] = messageDetails;
      return res.status(200).send(resType);
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
