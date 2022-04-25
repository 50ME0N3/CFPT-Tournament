# Post request

## /teams
`/teams <API_KEY> <discordId> <teamName>`

The request is used to create a team. `discordId` is the id of the role. `teamName` is the name of the team. Both of them will be saved in the database.

## /player
`/player <API_KEY> <PlayerName> <PlayerId> <TeamName>`

The request is used to add a player to a team. `PlayerName` is the name of the player. `PlayerId` is the id of the player. `TeamName` is the name of the team. Both of them will be saved in the database.

## /score
`/score <API_KEY> <id> <ScoreA> <ScoreB>`

The request is used to verify if the score is the same as the score set in the database. If there's no score for that match, the score will be set in the database. `id` is the id of the match. `ScoreA` is the score of the team A. `ScoreB` is the score of the team B.

## /verifyIfPlayerExist
`/verifyIfPlayerExist <API_KEY> <id>`

The request is used to verify if the player is in the database. `id` is the id of the player.