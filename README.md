# CFPT Tournament Environment
## STILL IN DEVELOPMENT
### Bot
The bot is here to control all the tournament inside the discord server.
>!createTeam teamname @1user @2user @3user @4user @5user

You can create a team. It will create a role and a 2 channel. 1 writing channel and 1 voice channel. The 5 members who's on the team will have the role and could access the channel others cant access it.


>!setScore idOfMatch scoreTeamA scoreTeamB

You can send score to verify them. The command should be used by both team. If the score is the same it will be send to the bracket to be saved. If the score is different a message will be send to the admin.

>!generateChannels

When the match is ended the command will generate the new channel for all the matches. Those channel will be accessible only by the both team that play the match. The command is only accessible by the admin.
 
>!help

Writing this in your channel will send an embeds containing a menu where you can choose wich parts of the commands you want to see.
	
>!time

This one dont have a real utility. It just used to have the date and time.

>!ping

This command return the ping of the socket in ms
### API
The API is used to link all the used data between the bot the database and the JSON files.
>/teams (post)

This call is used to create a new team.  To create the team you need to send the name and the role id of the team on discord.
>/teams (get)

This will list you in a JSON all the team that are in the database.
>/teamsWithId (get)

This is almost the same as before. The only difference is that the id are send with the name of the team.
>/player (post)

With that you can create a player and add it to a team. To create it you'll need the name of the player, his discord id and the name of his team.
>/player (get)

This call will return you a JSON of all the player inside a team.
>/score (post)

This call is used to verify the score who are send. You'll need to send the id of the match and both score. It will return a string containing the result of the verification. 
>/readyState (get)

You can use it to see wich match are ready to be played but doesn't have any channels
>/team (get)

You can use it to have all the information about a team with his id,
### Site
UNDER CONSTRUCTION.
