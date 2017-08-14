"use strict"
const axios = require('axios');

exports.getData = (users) => {
  const usersData = [];
  return new Promise((resolve, reject) => {

    const composeReposRequest = (user) => {
      return `https://api.github.com/users/${user}/repos`;
    }

    const composeUserRequest = (user) => {
      return `https://api.github.com/users/${user}`;
    }

    function getUserRepos(user) {
      return axios.get(composeReposRequest(user));
    }

    function getUserInfo(user) {
      return axios.get(composeUserRequest(user));
    }

    axios.all([getUserRepos(users[0]), getUserRepos(users[1]), getUserInfo(users[0]), getUserInfo(users[1])])
    .then(axios.spread(function (repos_one, repos_two, info_one, info_two) {
      const fetchedData = [repos_one.data,repos_two.data];
      const firstUserData = info_one.data;
      const secondUserData = info_two.data;

      fetchedData.map(repos => {
        let stars = 0,
            forks = 0,
            watches = 0;

        repos.forEach(repo => {
          stars += repo.stargazers_count;
          forks += repo.forks;
          watches += repo.watchers;
        });

        usersData.push({
          stars: stars,
          forks: forks,
          watches: watches
        });
      });

      usersData[0].username = firstUserData.login;
      usersData[0].followers = firstUserData.followers;

      usersData[1].username = secondUserData.login;
      usersData[1].followers = secondUserData.followers;

      return usersData;
    })).then(output => {
      console.log(usersData);
      return resolve(usersData);
    }).catch(err=>{return reject(err);});
});
}


exports.getWinner = obj =>{
                    let users = obj ,
                   starWinner =   compare(users,"stars"),
                   forkWinner = compare(users, "forks"),
                   watchWinner = compare(users, "watches"),
                   ffWinner  =  compare(users,"followers"),
                   battleWinner = calculatePoints(users);
                   
                   
                   return {
                     star_winner:starWinner,
                     fork_winner:forkWinner,
                     watch_winner:watchWinner,
                     follows_winner: ffWinner,
                     battle_winner: battleWinner
                     
                   }
                   
    };
    
    
function compare(users, prop){
     var  user1 = users[0], user2 = users[1];
      if (user1[prop] > user2[prop]){
          return user1.username;
      }
      else if (user1[prop] < user2[prop]){
        return user2.username;
      }
      else{
        return "tie";
      }
}

function calculatePoints(users){
    var points = {stars:20,forks:20, watches:10,follow:5};
    var user1 = users[0], user2 = users[1];
    var userPt1 = 0,userPt2 = 0;
    userPt1 = (user1.stars * points.stars) + (user1.forks * points.forks) + (user1.watches * points.watches) + (user1.followers * points.follow);
    userPt2 = (user2.stars * points.stars) + (user2.forks * points.forks) + (user2.watches * points.watches) + (user2.followers * points.follow);
    
    if (userPt1 > userPt2){ return user1.username; }
    else if (userPt1 < userPt2){ return user2.username; }
    else { return "tie"; }
}


