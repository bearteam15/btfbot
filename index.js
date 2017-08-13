"use strict";

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const battle = require('./battle.js');
const formatted = require('./format_output.js');

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
  const userText = req.body.text.split(" ");
  const firstUser = userText[0].toLowerCase();
  const secondUser = userText[1].toLowerCase();
  if (firstUser === "help" || secondUser == "help" || !firstUser || !secondUser){
     const help = getHelp();
    let data = {
    response_type: "in_channel",
    "text":  "" ,
    "mrkdwn": true,
    "attachments": [
      {
            "text": help}]};
    
   
    res.json(data);
  }

else{
  battle.getData([firstUser, secondUser]).then(users => {

    const winObj = battle.getWinner(users);

    const body = formatted.outputMessage(users, winObj);

    res.send(body);
  }).catch(err => {
    console.error('An error occurred making this request');
    console.error(err.message);
  });
}
});

function getHelp(){
  
  return "HelP MESSAGE HERE"
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
