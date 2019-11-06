#!/usr/bin/env node

const postMessageToSlack = require('./utils/post-message-to-slack.js');
const {slackToken, manualClubChannel} = require('./credentials.js');

main();

function main() {
  const clubMembers = {
    'Frank': 'U04U4G7EP',
    'Cody': 'U8SF3NRR7',
    'Taylor': 'UB9EHTN8Y',
    'Duncan': 'ULULNTY8L',
    'Jason': 'U8MMWTNNR',
    'Marty': 'UFPKJR01Z',
    'Phillip': 'UPNT7H856',
    'Austin': 'UP5SMUS48',
  };

  const {userId} = getRandomPerson(clubMembers);
  const messageText = `*Congratulations <@${userId}>!* You've been randomly selected to choose the reading/video/etc. for this week's discussion.`;

  const messageBody = {
    token: slackToken,
    channel: manualClubChannel,
    text: messageText,
    as_user: false,
    username: 'Manual Club Bot',
    icon_emoji: ':level_up:'
  };

  postMessageToSlack(messageBody);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomPerson(clubMembers) {
  const names = Object.keys(clubMembers);
  const randomIndex = getRandomInt(names.length);
  const randomName = names[randomIndex];

  return {
    name: randomName,
    userId: clubMembers[randomName]
  };
}

