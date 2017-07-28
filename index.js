"use strict";

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');


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
    const opponent = req.body.text.split(" ");
    var user1 = opponent[0], user2 = opponent[1];
    const currentUser = req.body.user_name;
     const body = {
        response_type: "in_channel",
        "attachments": [{
            "text": ""
        }]
     };
     
     var options = {
  url: 'https://api.github.com/users/'+ user1+ '/repos',
  headers: {
    'User-Agent': 'request'
  }};
  
  
 request(options,function callback(error, response, body) {
      if (error) throw error;
    if (!error && response.statusCode == 200) {
         var repos = JSON.parse(body);
          var stars  = 0, forks = 0, watches = 0;
               repos.forEach((x)=>{
                   stars += x.stargazers_count;
                   forks += x.forks;
                   watches += x.watchers;
                  
               });
               
        body.attachments[0].text = `@${user1} data=>
                             stars: ${stars}
                             fork: ${forks}
                             watches: ${watches}`
        res.send(body);
                            }
                            });
 
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
