import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  // in every 14 min
  const apiUrl = process.env.API_URL;
  
   if (!apiUrl) {
    console.error("❌ CRON ERROR: API_URL not defined in environment variables!");
    return;
  }

  https
    .get(apiUrl, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully!");
      else console.log("GET request failed!", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

export default job;

// CRON JOBS are scheduled tasks that run periodically at fixed intervals
// we want to send 1 GET request for every 14 min
