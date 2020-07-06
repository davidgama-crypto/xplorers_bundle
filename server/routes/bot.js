var express = require("express");

var router = express.Router();

const { createEventAdapter } = require("@slack/events-api");
const { WebClient } = require("@slack/web-api");

// Read necessary env vars for Slack SDK
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackToken = process.env.SLACK_TOKEN;

if (!slackSigningSecret || !slackToken) {
  console.error("SLACK_SIGNING_SECRET or SLACK_TOKEN env var not set!");
  process.exit(1);
}

// Initialize
const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackToken);

slackEvents.on("app_mention", async (event) => {
  console.log("Incoming app_mention event.text:", event.text);

  var text = "";
  if (event.text.includes("play")) {
    text = "Playing isn't quite ready yet, sorry!";
  } else {
    text = "Sorry I didn't quite get that, try saying `@bundle let's play!`";
  }
  console.log("Sending response to user: ", text);
  const result = await slackClient.chat.postMessage({
    channel: event.channel,
    text,
  });

  console.log("Result of response: ", result.ok);
});

// All errors in listeners are caught here. If this weren't caught, the program would terminate.
slackEvents.on("error", (error) => {
  console.error("Error thrown in slack bot:");
  console.error(error);
});

router.use("/", slackEvents.requestListener());
module.exports = router;
