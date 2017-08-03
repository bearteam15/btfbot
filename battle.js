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
    });
});
}
