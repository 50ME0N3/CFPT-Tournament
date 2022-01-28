/**
 * @Author Antoine Davet, Alexandre Pintrand, Jérémie Arcidiacono
 * @description generate channel for all match with ready states
 * @date 24.01.2022
 * @project Tournois
 */
const axios = require("axios");
const {json} = require("body-parser");
const {Message, Client} = require("discord.js");
const { MessageEmbed } = require('discord.js');
const bracketDB = require("../../../db.json")
const fs = require('fs')

module.exports = {
    name: "generateChannels",
    aliases: ['gc', 'generateChannels'],
    /**
     * generate channel for all match with ready states
     *
     * @param client client discordJS
     * @param message le message
     * @returns {Promise<void>} tkt jsp ce que c'est mais c'est la
     */
    run: async (client, message) => {
        if (message.member.roles.cache.some(role => role.name === 'ORGA')) {
            axios
                .get('http://localhost:3000/readyState')
                .then(async res => {
                    for (const element of res.data.channelToCreate) {
                        let team1, idTeam1, team2, idTeam2, id;
                        id = element.id;
                        await axios
                            .get('http://localhost:3000/team?id=' + element.team1)
                            .then(res => {
                                team1 = res.data[0].name;
                                idTeam1 = res.data[0].discordId;
                            })
                        await axios
                            .get('http://localhost:3000/team?id=' + element.team2)
                            .then(res => {
                                team2 = res.data[0].name;
                                idTeam2 = res.data[0].discordId;
                            })
                        await createChannel(id, team1, idTeam1, team2, idTeam2, message)
                    }

                })
        } else {
            message.reply("You dont have the permission to that command")
        }
    }

}

/**
 * create a channel for both team with the right to access
 * @param id id of the match
 * @param team1 team name
 * @param idTeam1 discord id
 * @param team2 team name
 * @param idTeam2 discord id
 * @param message the discrodJS var
 */
async function createChannel(id, team1, idTeam1, team2, idTeam2, message) {
    bracketDB["match"][id].status = 6
    fs.writeFileSync('../db.json', JSON.stringify(bracketDB))
    let category = await message.guild.channels.create(team1 + " vs " + team2, {
        type: 'GUILD_CATEGORY',
        permissionOverwrites: [{
            id: idTeam1,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
        },
            {
                id: idTeam2,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            },
            {
                id: message.guild.roles.everyone.id,
                deny: ['VIEW_CHANNEL'],
            }],
    });

    const InfoMessage = {
        color: 0x0099ff,
        title: `${team1} vs ${team2}`,
        author: {
            name: 'someone',
        },
        description: 'Quelque informations pour les résultats de votre game',
        fields: [
            {
                name: 'Comment donner les scores ?',
                value: 'Les scores sont donné via le bot\r\n ' +
                       'La commande est:\n' +
                       `!ss ${id} score de l'équipe: ${team1} score de l'équipe: ${team2}`,
            },
        ],
        timestamp: new Date(),
        footer: {
            text: 'CFPT-Tournament',
        },
    };


    let textChannel = await message.guild.channels.create(team1 + " vs " + team2, {
        type: "GUILD_TEXT",
    })
    textChannel.send({ embeds: [InfoMessage] });
    await textChannel.setParent(category.id);
}