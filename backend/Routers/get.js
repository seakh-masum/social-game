const router = require("express").Router();
const studentDetail = require("../Models/student-details");
const passport = require("passport");
const Strategy = require("passport-facebook");
const axios = require("axios");
const jwtTokenVerify = require("../Service/jwt-token-verify");
const messages = require("../Models/messages");
const userDetails = require("../Models/user-details");
// passport.use(
//   new Strategy(
//     {
//       clientID: "455538855453181",
//       clientSecret: "3f23ac400356698f5b1bbb9b62e43d67",
//       callbackURL: "http://localhost:3000/api/fb/auth/",
//       enableProof: true,
//       profileFields: [
//         "id",
//         "displayName",
//         "email",
//         "birthday",
//         "friends",
//         "picture",
//       ],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       const user = {
//         accessToken: accessToken,
//       };
//       done(null, user);
//     }
//   )
// );

// router.get(
//   "/fb/login",
//   passport.authenticate("facebook", {
//     authType: "rerequest",
//   })
// );
// router.get("/failed/login", (req, res) => {
//   res.send("Failed to Login");
// });
// router.get(
//   "/fb/auth",
//   passport.authenticate("facebook", { failureRedirect: "/failed/login" }),
//   async (req, res) => {
//     console.log(req.user, req.isAuthenticated());
//     try {
//       const { data } = await axios({
//         url: "https://graph.facebook.com/me",
//         method: "get",
//         params: {
//           fields: [
//             "id",
//             "email",
//             "first_name",
//             "last_name",
//             "gender",
//           ].join(","),
//           access_token: req.user.accessToken,
//         },
//       });
//       console.log(data);
//       res.send(data);
//     } catch (err) {
//       res.send(err.message);
//     }
//   }
// );

// router.get("/fb/logout", (req, res) => {
//   req.logOut();
//   console.log(req.user, req.isAuthenticated());
//   res.send("User is Logged out");
// });

// Student Details
router.get("/student-details", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  await studentDetail.find({}, async function (err, params) {
    if (err) {
      resType["Message"] = err.message;
      res.status(400).send(resType);
    }
    if (!req.query.currentpage || req.query.currentpage == 0) {
      resType["Message"] = "Current page is Required and it can not be Zero";
      return res.status(400).send(resType);
    }
    if (!req.query.pagelimit || req.query.pagelimit == 0) {
      resType["Message"] = "Page limit is Required and it can not be Zero";
      return res.status(400).send(resType);
    }
    var startIndex = (req.query.currentpage - 1) * req.query.pagelimit;
    const studentData = [];
    for (
      let i = startIndex;
      i <= req.query.pagelimit * req.query.currentpage - 1;
      i++
    ) {
      if (params[i]) {
        studentData.push(params[i]);
      } else {
        break;
      }
    }
    if (params && params.length > 0) {
      resType["Message"] = "Successful";
      resType["Data"] = studentData;
      resType["Count"] = params.length;
      resType["Status"] = true;
      return res.status(200).send(resType);
    } else {
      resType["Status"] = true;
      resType["Message"] = "No Student Details is found";
      return res.status(400).send(resType);
    }
  });
});
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
          date: messageSplit[i].split("|")[1],
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
  await userDetails.find({}, async (err, params) => {
    if (err) {
      resType["Message"] = err.message;
      return res.status(400).send(resType);
    }
    if (params.findIndex((x) => x.username == req.params.searchdata) != -1) {
      resType["Message"] = "Username is not available";
      return res.status(400).send(resType);
    }
  });
  try {
    resType["Status"] = true;
    resType["Message"] = "Username is available";
    return res.status(200).send(resType);
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
});
module.exports = router;
