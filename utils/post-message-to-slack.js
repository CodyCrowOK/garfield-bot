const fetch = require('node-fetch');
const encodeGetParams = require('./encode-get-params.js');

function postMessageToSlack(arguments) {
  if (typeof arguments === typeof {}) {
    arguments = encodeGetParams(arguments);
  }

  fetch('https://slack.com/api/chat.postMessage?' + arguments, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(response => console.log(response));
}

module.exports = postMessageToSlack;
