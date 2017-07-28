var https = require("https");
var userName='bearteam15';
var request = require('request'),
fs ;
const url = "https://api.github.com/users/bearteam15/repos";
var exports = module.exports = {};

 
var options = {
  url: 'https://api.github.com/users/request/repos',
  headers: {
    'User-Agent': 'request'
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var repos = JSON.parse(body);
     var stars  = 0, forks = 0, watches = 0;
               repos.forEach((x)=>{
                   stars += x.stargazers_count;
                   forks += x.forks;
                   watches += x.watchers;
               });
        console.log('stars,forks,watchers',stars, forks, watches);
        res();
        
  }
}
 
function res(){
    console.log('lo');
}


var container = function(username, res){
    
                request(options, callback, res);
                console.log(username);
}






