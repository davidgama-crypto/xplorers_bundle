const express = require('express');

const router = express.Router();

const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const RoomsController = require('../controllers/RoomsController');

// Read necessary env vars for Slack SDK
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET||'22825902f7b36e363b318ee70e62b14d'
const slackToken = process.env.SLACK_TOKEN||'xoxb-191101040807-1224995288883-vp8bRd0bfzy2feN3uNyx5jYm'
const serverURL = process.env.SELF_DOMAIN||'http://localhost:3005'


if (!slackSigningSecret || !slackToken || !serverURL) {
  console.error(
    'SLACK_SIGNING_SECRET or SLACK_TOKEN or SELF_DOMAIN env var not set!',
  );
  process.exit(1);
}

// Initialize
const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackToken);

slackEvents.on('app_mention', async (event) => {
  console.log('Incoming app_mention event.text:', event.text);
  let text = '';
  if (event.text.includes('play')) {
    const { url } = await RoomsController.generateRoom();
    text = url;
  } else {
    text = "Sorry I didn't quite get that, try saying `@bundle let's play!`";
  }
  console.log('Sending response to user: ', text);
  const result = await slackClient.chat.postMessage({
    channel: event.channel,
    text,
  });

  console.log('Result of response: ', result.ok);
});

// All errors in listeners are caught here. If this weren't caught, the program would terminate.
slackEvents.on('error', (error) => {
  console.error('Error thrown in slack bot:');
  console.error(error);
});

router.use('/', slackEvents.requestListener());
module.exports = router;
