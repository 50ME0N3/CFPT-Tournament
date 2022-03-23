## How to download
First you have to download the whole project on github

The Project contain 3 main folders

- BotTournois
- API
- Site

The project need all of them to work normally.

<hr>

## How to run 
Each folder is a node.js server. To run them you'll need to run those command.

-   `npm run bot` (in the root folder)
-   `npm run api` (in the root folder)
-   `npm run site` (in the root folder)

Make sure you doesn't have any server that runs on port 443 and 7000

You can use pm2 to run them in the background

<hr>

## How to config
In each folder you'll find some config file. You'll need to complete them.

This is an exemple of the config.json of the bot

    {
    "token": "The token of your bot",
    "prefix": "!",
    "everyoneMention": true,
    "hostedBy": true,
    "API_KEY": "The key of the API (you'll need to choose it)",
    "adminRolesId": "The id of your admin role",
    "MainAdminUserId": "The id of your main admin",
    "PayementInWaitingRoleId": "The id of the role for the payement"
    "IpAPI": "The ip of the api"
    }

-   `CFPT-Tournament/botTournois/config.json` the config of the bot
-   `CFPT-Tournament/apiTournois/api/config/api.config.js` the config for the api
-   `CFPT-Tournament/apiTournois/api/config/db.config.js` the config for the connection to the database
-   `CFPT-Tournament/site/config.js` the config of the site