"use strict";

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const battle = require('./battle.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
    const opponent = req.body.text;
    const currentUser = req.body.user_name;
    const body = {
        response_type: "in_channel",
        "attachments": [{
            "text": `Let's start battle @${currentUser} VS @${opponent}! Who will be the winner?`
        }]
    };
    battle.getData('bearteam15').then(text=>{
        console.log(text);
    body.text = text;
    res.send(body);
}).catch(err => {
  console.error('An error occurred making this request');
  console.error(err.message);
});
    
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
