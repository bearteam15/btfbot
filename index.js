"use strict";

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const battle = require('./battle.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'landing-page/dist')));

const apikey = process.env.SLACK_API_TOKEN;

app.set('port', (process.env.PORT || 9001));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/landing-page/dist/index.html');
});

app.get('/hello', (req, res) => {
  res.send('hello');
});

app.post('/', (req, res) => {
  const opponents = req.body.text.split(" ");
  const firstUser = opponents[0];
  const secondUser = opponents[1];

  const body = {
    response_type: "in_channel",
    "attachments": [
      {
        "text": `Let's start battle @${firstUser} VS @${secondUser}! Who will be the winner?`
      }
    ]
  };

  battle.getData([firstUser, secondUser]).then(text => {
    const output = `user: ${text[0].username}
                    stars: ${text[0].stars}
                    fork:${text[0].forks}
                    watch:${text[0].watches}
                    followers:${text[0].followers}
                    --------------------------------
                    user: ${text[1].username}
                    stars: ${text[1].stars}
                    fork:${text[1].forks}
                    watch:${text[1].watches}
                    followers:${text[1].followers}`;

    console.log(output);
    body.text = output;
    res.send(body);
  }).catch(err => {
    console.error('An error occurred making this request');
    console.error(err.message);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
