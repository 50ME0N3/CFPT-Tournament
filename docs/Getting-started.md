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

-   `node index.js` (in the BotTournois folder)
-   `npm run api` (in the root folder)
-   `npm run site` (in the root folder)

The bot doesn't work with the npm run command so you need to search him manually.

Make sure you doesn't have any server that runs on port 3000 and 7000

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
    }