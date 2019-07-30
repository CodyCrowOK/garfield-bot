#!/usr/bin/env node

const fetch = require('node-fetch');
const Parser = require('node-html-parser');
const {slackToken, channel} = require('./credentials.js');

const today = new Date();
const dateString = today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate();

const url = 'https://www.gocomics.com/garfieldespanol%20/' + dateString;

fetch(url)
  .then(response => response.text())
  .then(document => {
    const root = Parser.parse(document);
    const imgWrapper = root.querySelector('.item-comic-image');
    const img = imgWrapper.querySelector('img');
    const imgUrl = img.attributes.src;

    const slackImageBlock = {
      "type": "image",
      "image_url": imgUrl,
      "alt_text": 'Debajo del puente en Guadalajara había un conejo debajo del agua.'
    };

    const postMessageBody = {
      token: slackToken,
      channel,
      text: ':cool:',
      blocks: JSON.stringify([slackImageBlock]),
      as_user: false,
      username: 'Garfield Bot',
      icon_emoji: ':garfield:'
    };

    const encodeGetParams = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
    const arguments = encodeGetParams(postMessageBody);

    fetch('https://slack.com/api/chat.postMessage?' + arguments, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postMessageBody)
    }).then(response => response.json())
    .then(response => console.log(response));
  });
