const router = require("express").Router();
const cron = require("node-cron");
const axios = require("axios");

const task = cron.schedule(
  "0 */1 * * * *",
  async () => {
    console.log("running a task every minute");
    const url = "https://fcm.googleapis.com/fcm/send";
    // axios
    //   .post(
    //     url,
    //     {
    //       notification: {
    //         title: "Test Kor6i ekhon",
    //         body: "Testing Purpouse",
    //       },
    //       to:
    //         "fWzFmbd5i6uRlMiF_rHm7I:APA91bGMcbyThov0KQMDM_DfZtxiTQ2sDJtH3rU4MytYBV8Gbx82P0TekS9SHflg_3XlZ92-yriCZstMfzi5_C6qSoZEpS6blO2gxFcQiIGnZeXm9gxS8AXkzPVfbcTGa45fLbLUcAzT",
    //     },
    //     {
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Content-type": "application/json",
    //         Authorization: `key=AAAAf2Imejg:APA91bF5voPnobIAugEgkiFAgIJR2Ld4JsmeBmAhKB0Fc_-4ytvJrAumE3_YlPTfHCyGR7J5tWeIDQg5uUaXbDNizRFvaZs-gH7QZeBsHpY-eJ1fAYmFwsXHcTFgMiLbYjOYl8OJM1nG`,
    //       },
    //     }
    //   )
    //   .then(
    //     (response) => {
    //       var response = response.data;
    //       console.log(response);
    //     },
    //     (error) => {
    //       var status = error.response.status;
    //       console.log(status);
    //     }
    //   );
  },
  {
    scheduled: true,
  }
);

task.start();
module.exports = router;
