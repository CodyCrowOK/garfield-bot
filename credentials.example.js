/**
 * This uses a legacy Slack token, which can be generated here:
 * https://api.slack.com/custom-integrations/legacy-tokens
 */
const slackToken = 'Legacy user token';

/**
 * This is the ID of the channel you wish to post to.
 * It can be found in the last section of the URL of a Slack channel
 * in the Slack web client.
 */
const channel = 'Channel ID';

module.exports = {
  slackToken,
  channel
};
