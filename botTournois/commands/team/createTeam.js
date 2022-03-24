/**
 * @Author Antoine Davet, Alexandre Pintrand, Jérémie Arcidiacono
 * @description Create all chanel (voice and text) with the team name, create the role with the team name and set the role to the players. Create a team in the database and add players too. link them together.
 * @date 25.11.21
 * @project Tournois
 */

const axios = require("axios");
const {Message, Client} = require("discord.js");
const config = require("../../config.json")
const Console = require("console");
const {IpSite} = require("../../../apiTournois/api/config/api.config");
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "createTeam",
    description: "permets de créer une équipe",
    aliases: ['ct', 'createTeam'],

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
        let MaxTeam = false;
        let alreadyExist = false;

        await axios
            .get(config.IpAPI + 'numberOfTeams', {})
            .then(result => {
                MaxTeam = parseInt(result.data) >= 8;
            })
            .catch(error => {
                console.error(error)
            })

        if (!MaxTeam) {
            if (players.users.size === 5) {
                //cree le role avec le nom de l'equipe et une couleur aléatoire
                let role = await message.guild.roles.create({
                    name: teamName,
                    color: getRandomColor(),
                    mentionable: true
                });
                alreadyExist = await sendRequestForVerifyPlayer(players);

                if (!alreadyExist) {
                    //cree une categorie qui met les permissions nécessaire pour le role de l'equipe
                    let category = await message.guild.channels.create(teamName, {
                        type: 'GUILD_CATEGORY',
                        position: 2,
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
                    });

                    //créé un salon oral pour l'equipe
                    let Voicechannel = await message.guild.channels.create(teamName, {
                        type: "GUILD_VOICE", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
                    })
                    const InfoMessage = {
                        color: 0x0000ff,
                        title: `${teamName} channels`,
                        author: {
                            name: 'jxrx',
                        },
                        description: 'Quelques informations pour vos salons',
                        fields: [
                            {
                                name: 'Salon textuel',
                                value: 'Bienvenue dans le salon textuel privé dédié à votre équipe.',
                            },
                            {
                                name: 'Salon vocal',
                                value: '<#' + Voicechannel.id +'> vous permet de parler pendant les matchs. N\'oubliez de rester connectés dans le vocal durant vos matchs ! '
                            },
                            {
                                name: 'Paiement',
                                value: 'Pour terminer votre inscription, souvenez vous d\'ouvrir rapidement un ticket dans le channel <#951499498520203315> .'
                            }
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: 'CFPT-Tournament',
                        },
                    };
                    Textchannel.send({embeds: [InfoMessage]});

                    //deplace les salons dans la categorie et fais en sorte que les salons aie les même permissions que la catégorie
                    await Textchannel.setParent(category.id);
                    await Voicechannel.setParent(category.id);
                    players.members.each(element => element.roles.add(role));
                    let rolePayement = message.guild.roles.cache.find(r => r.id === config.PayementInWaitingRoleId);
                    players.members.each(element => element.roles.add(rolePayement));

                    await sendRequestForTeam(teamName, role.id);
                    players.members.each(element =>
                        sendRequestForPlayer(element.user.username, element.user.id, teamName));                    

                    message.reply("L'équipe a été crée");
                } else {
                    message.reply("Un des joueurs est déjà dans une équipe")
                }
            } else if (players.users.size < 5) {
                message.reply("il n'y a pas assez de joueurs dans l'équipe")
            } else {
                message.reply("il y a trop de joueurs dans l'équipe")

            }
        } else {
            message.reply("Désolé, le tournoi est déjà complet. Suivez les annonces pour savoir si des places se libèrent !");
            client.users.fetch(config.MainAdminUserId, false).then((user) => {
                user.send("Une équipe a éssayé de s'inscire mais c'est plein");
            })
        }
    }
};

async function sendRequestForVerifyPlayer(players) {
    let alreadyExist = false;
    for(const player of players.members) {
        await axios
            .post(config.IpAPI + 'verifyIfPlayerExist', {
                API_KEY: config.API_KEY,
                id: parseInt(player[0])
            })
            .then(result => {
                alreadyExist = parseInt(result.data) >= 1;
            })
            .catch(error => {
                console.error(error)
            })
    }
    return alreadyExist;
}

/**
 * Envoie une requête http vers l'api contenant l'id du role et le nom de l'équipe
 * @param teamName nom de l'équipe
 * @param discordId id du role
 */
function sendRequestForTeam(teamName, discordId) {
    axios
        .post(config.IpAPI + 'teams', {
            API_KEY: config.API_KEY,
            teamName: teamName,
            discordId: discordId
        })
        .then(res => {
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
function sendRequestForPlayer(playerName, playerId, teamName) {
    axios
        .post(config.IpAPI + 'player', {
            API_KEY: config.API_KEY,
            teamName: teamName,
            playerId: playerId,
            playerName: playerName
        })
        .then(res => {
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
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
}

Object.size = function (obj) {
    let size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};