# Daily Garfield en Español Slack Poster

This uses Slack's legacy API to post the current Garfield en Español to a specified channel.

## Setup

0. Install Node.js
1. Copy `credentials.example.js` to `credentials.js`, and replace the values for `channel` and `slackToken` with your correct values.
2. Run `npm install` to install dependencies

You can now run `node garfield.js` to post today's Garfield en Español to your Slack channel. You can easily automate this with a cron job.
