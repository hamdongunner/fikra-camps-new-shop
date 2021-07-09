import * as cron from "node-cron";
// var cron = require("node-cron");

export default () => {
  cron.schedule("* * * * *", () => {
    console.log("running a task every minute");
  });
};
