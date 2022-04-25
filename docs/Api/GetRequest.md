# Get request

## /teams
`/teams`

The request is used to list all the teams in the database.

## /teamsWithId
`/teamsWithId`

The request is the same as /teams, but it returns the id of the team.

## /players
`/players <TeamName>`

The request is used to list all the players of a team in the database. `TeamName` is the name of the team.

## /readyState
`/readyState <API_KEY>`

The request is used to know which match as the status 2. The status 2 means that the match is ready to start.

## /team
`/team <id>`

The request is used to get the team with the role id `id`.

## /numberOfTeams
`/numberOfTeams`

The request is used to get the number of teams in the database.