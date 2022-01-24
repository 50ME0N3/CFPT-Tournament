/**
 * @Author Antoine Davet, Alexandre Pintrand, Jérémie Arcidiacono
 * @description Create all chanel (voice and text) with the team name, create the role with the team name and set the role to the players. Create a team in the database and add players too. link them together.
 * @date 25.11.21
 * @project Tournois
 */

const axios = require("axios");
const { Message, Client } = require("discord.js");

module.exports = {
    name: "createTeam",
    description: "permets de créer une équipe",
    aliases: ['ct'],

    /**
     * Créé le role, les channels et assigne le role aux joueurs
     *
     * @param client client discordJS
     * @param message le message
     * @returns {Promise<void>} tkt jsp ce que c'est mais c'est la
     */
    run: async (client, message) => {
        const args = message.content.slice(1).trim().split(/ +/);
        let teamName = args[1];
        let players = message.mentions;
        console.log(players.users.size)
        //players.users.each(element => console.log(message.guild.members.cache.find(r => r.id === element)));
        //console.log(message.guild.members.cache);
        //console.log(players.members);
        players.members.each(element => console.log(element.user.id));

        if (players.users.size === 5) {
            //cree le role avec le nom de l'equipe et une couleur aléatoire
            let role = await message.guild.roles.create({
                name: teamName,
                color: getRandomColor(),
                mentionable: true
            });

            //cree une categorie qui met les permissions nécessaire pour le role de l'equipe
            let category = await message.guild.channels.create(teamName, {
                type: 'GUILD_CATEGORY',
                permissionOverwrites: [{
                    id: role, //To make it be seen by a certain role, user an ID instead
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
                },
                    {
                        id: message.guild.roles.everyone.id, //To make it be seen by a certain role, user an ID instead
                        deny: ['VIEW_CHANNEL'], //Allow permissions
                    }],
            });

            //créé un salon ecrit pour l'equipe
            let Textchannel = await message.guild.channels.create(teamName, {
                type: "GUILD_TEXT", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
            })

            //créé un salon oral pour l'equipe
            let Voicechannel = await message.guild.channels.create(teamName, {
                type: "GUILD_VOICE", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
            })

            //deplace les salons dans la categorie
            await Textchannel.setParent(category.id);
            await Voicechannel.setParent(category.id);
            players.members.each(element => element.roles.add(role));

            await sendRequestForTeam(teamName, role.id);
            players.members.each(element =>
                sendRequestForPlayer(element.user.username, element.user.id, teamName));
        }
        else if(players.users.size < 5){
            message.reply("il n'y a pas assez de joueurs dans l'équipe")
        }
        else{
            message.reply("il y a trop de joueurs dans l'équipe")

        }
    }
};

/**
 * Envoie une requête http vers l'api contenant l'id du role et le nom de l'équipe
 * @param teamName nom de l'équipe
 * @param discordId id du role
 */
function sendRequestForTeam(teamName, discordId){
    axios
        .post('http://localhost:3000/teams', {
            teamName: teamName,
            discordId: discordId
        })
        .then(res => {
            console.log(`Team en base`)
        })
        .catch(error => {
            console.error(error)
        })

}

/**
 * Envoie une request http vers l'api contenant l'id du joueurs son nom et le nom de sa team
 * @param playerName le nom du joueurs
 * @param playerId l'id du joueurs
 * @param teamName le nom de l'équipe
 */
function sendRequestForPlayer(playerName, playerId, teamName){
    axios
        .post('http://localhost:3000/player', {
            teamName: teamName,
            playerId: playerId,
            playerName: playerName
        })
        .then(res => {
            console.log(`player in base`)
        })
        .catch(error => {
            console.error(error)
        })
}

/**
 * Renvoie un couleurs random
 * @returns {number[]} une couleur random
 */
function getRandomColor() {
    return [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)];
}

Object.size = function(obj) {
    let size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};