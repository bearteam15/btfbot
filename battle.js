const request = require('request');

 exports.getData = function(username){
             var options = {
  url: 'https://api.github.com/users/'+ username+ '/repos',
  headers: {
    'User-Agent': 'request'
  }};
  
        return new Promise((resolve, reject)=>{
            request(options, (error, response,body)=>{
                if (error) return reject(error);
                  if (!error && response.statusCode == 200) {
         var repos = JSON.parse(body);
          var stars  = 0, forks = 0, watches = 0;
               repos.forEach((x)=>{
                   stars += x.stargazers_count;
                   forks += x.forks;
                   watches += x.watchers;
                  
               });
               
       var text = `@${username} data=>
                             stars: ${stars}
                             fork: ${forks}
                             watches: ${watches}`;
        return resolve(text);
       
                            }
          
            });
        })

}

