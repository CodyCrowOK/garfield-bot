#!/usr/bin/env node

const fetch = require('node-fetch');
const Parser = require('node-html-parser');

const {slackToken, garfieldChannel} = require('./credentials.js');
const encodeGetParams = require('./utils/encode-get-params.js');
const postMessageToSlack = require('./utils/post-message-to-slack.js');

const today = new Date();
const dateString = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

const url = 'https://www.gocomics.com/garfieldespanol%20/' + dateString;

fetch(url)
  .then(response => response.text())
  .then(document => {
    const imgUrl = getImageUrlFromRawHtmlDocument(document);
    const slackImageBlock = buildSlackImageBlockFromImageUrl(imgUrl);
    const postMessageBody = buildPostMessageArgumentsObjectFromImageBlock(slackImageBlock);
    const arguments = encodeGetParams(postMessageBody);

    postMessageToSlack(arguments);
  });

function getImageUrlFromRawHtmlDocument(document) {
  try {
    const root = Parser.parse(document);
    const imgWrapper = root.querySelector('.item-comic-image');
    const img = imgWrapper.querySelector('img');

    return img.attributes.src;
  } catch (e) {
    return 'https://vignette.wikia.nocookie.net/garfield/images/a/a6/MistakesWillHappenTitleCard.png/revision/latest/scale-to-width-down/699';
  }
}

function buildSlackImageBlockFromImageUrl(imgUrl) {
  return {
    "type": "image",
    "image_url": imgUrl,
    "alt_text": 'Debajo del puente en Guadalajara había un conejo debajo del agua.'
  };
}

function buildPostMessageArgumentsObjectFromImageBlock(slackImageBlock) {
  return {
    token: slackToken,
    channel: garfieldChannel,
    text: ':cool:',
    blocks: JSON.stringify([slackImageBlock]),
    as_user: false,
    username: 'Garfield Bot',
    icon_emoji: ':garfield:'
  };
}
