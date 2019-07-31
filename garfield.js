#!/usr/bin/env node

const fetch = require('node-fetch');
const Parser = require('node-html-parser');
const {slackToken, channel} = require('./credentials.js');

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
    channel,
    text: ':cool:',
    blocks: JSON.stringify([slackImageBlock]),
    as_user: false,
    username: 'Garfield Bot',
    icon_emoji: ':garfield:'
  };
}

function encodeGetParams (argumentsAsObject) {
  return Object.entries(argumentsAsObject)
    .map(
      kv => kv.map(encodeURIComponent)
        .join("=")
    )
    .join("&");
}

function postMessageToSlack(arguments) {
  fetch('https://slack.com/api/chat.postMessage?' + arguments, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(response => console.log(response));
}
