## Create Team
`!createTeam <teamName> <Player1> <Player2> <Player3> <Player4> <Player5>`
The command is used to create a team. All members need to be mentioned. After the command is used correctly the bot will create 2 channels. A voice channel and a text channel.

## Set Score
`!setScore <idOfMatch> <scoreTeamA> <scoreTeamB>`
The command is used by the team to send there score to verify them and make them go through the tournament.

It has 3 different response.

-   It's the first team to send the score   
    -   The score will be saved in a temporary json to wait the next team to check
-   It's the same score as the first team
    - The score will be send to the db.json, who's the bracket   
-   It's a different score as the first team
    - It will send a message to the main admin to ask him to check the score with the teams   

## Generate channels
`!generateChannels`

The command can only be used by admin

It will create a channel for each match that is ready to be played and send a information message for both team

## Help
`!help`

The command will display an help message. It will show a litle description for each command.

## Time
`!time`

The command will return the date and hour of the bot.

## Ping
`!ping`

The command return the response time of the socket