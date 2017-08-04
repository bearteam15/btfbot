"use strict"

exports.outputMessage = (users, winObj) => {
  return {
    response_type: "in_channel",
    "text": `
      ${winObj.battle_winner !== 'tie' ? ':trophy: *' + winObj.battle_winner + '* :trophy: is a winner!' : "It's a tie!" }
    `,
    "mrkdwn": true,
    "attachments": [
      {
            "fallback": `Data for @${users[0].username}:`,
            "text": `Data for @${users[0].username}:`,
            "fields": [
                {
                    "title": "Stars (All repos)",
                    "value": `${winObj.star_winner === users[0].username ? ':sports_medal:' : ''} ${users[0].stars}`,
                    "short": true
                },
                {
                    "title": "Forks (All repos)",
                    "value": `${winObj.fork_winner === users[0].username ? ':sports_medal:' : ''} ${users[0].forks}`,
                    "short": true
                },
                {
                    "title": "Watchers (All repos)",
                    "value": `${winObj.watch_winner === users[0].username ? ':sports_medal:' : ''} ${users[0].watches}`,
                    "short": true
                },
                {
                    "title": "Followers",
                    "value": `${winObj.follows_winner === users[0].username ? ':sports_medal:' : ''} ${users[0].followers}`,
                    "short": true
                }
            ],
            "color": `${winObj.battle_winner === users[0].username ? '#36a64f' : '#F35A00'}`
        },
        {
              "fallback": `Data for @${users[1].username}:`,
              "text": `Data for @${users[1].username}:`,
              "fields": [
                  {
                      "title": "Stars (All repos)",
                      "value": `${winObj.star_winner === users[1].username ? ':sports_medal:' : ''} ${users[1].stars}`,
                      "short": true
                  },
                  {
                      "title": "Forks (All repos)",
                      "value": `${winObj.fork_winner === users[1].username ? ':sports_medal:' : ''} ${users[1].forks}`,
                      "short": true
                  },
                  {
                      "title": "Watchers (All repos)",
                      "value": `${winObj.watch_winner === users[1].username ? ':sports_medal:' : ''} ${users[1].watches}`,
                      "short": true
                  },
                  {
                      "title": "Followers",
                      "value": `${winObj.follows_winner === users[1].username ? ':sports_medal:' : ''} ${users[1].followers}`,
                      "short": true
                  }
              ],
              "color": `${winObj.battle_winner === users[1].username ? '#36a64f' : '#F35A00'}`
          }
    ]
  };
}
