let express = require("express");
let router = express.Router();

const { createEventAdapter } = require("@slack/events-api");
const { WebClient } = require("@slack/web-api");
const RoomsController = require("../controllers/RoomsController");
var Redis = require("ioredis");
var JSONCache  = require('redis-json');
var redisConfig = require("../utils/redisConfig");

const redisClient = new Redis(redisConfig.REDIS_CONF);
const jsonCache = new JSONCache(redisClient);
const roomsController = new RoomsController();

// Read necessary env vars for Slack SDK
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackToken = process.env.SLACK_TOKEN;
const serverURL = process.env.SELF_DOMAIN;

if (!slackSigningSecret || !slackToken) {
  console.error("SLACK_SIGNING_SECRET or SLACK_TOKEN env var not set!");
  process.exit(1);
}

// Initialize
const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackToken);

slackEvents.on("app_mention", async (event) => {
  console.log("Incoming app_mention event.text:", event.text);
  const roomId = await roomsController.generateRoom(jsonCache);
  var text = "";
  if (event.text.includes("play")) {
    const roomId = await roomsController.generateRoom(jsonCache);
    text =  serverURL + roomId;
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