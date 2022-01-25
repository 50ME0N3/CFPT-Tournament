/**
 * @Author Antoine Davet, Alexandre Pintrand, Jérémie Arcidiacono
 * @description generate channel for all match with ready states
 * @date 24.01.2022
 * @project Tournois
 */
const axios = require("axios");
const { json } = require("body-parser");
const { Message, Client } = require("discord.js");

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
    run: async(client, message) => {
        axios
            .get('http://localhost:3000/readyState')
            .then(res => {
                res.data.channelToCreate.forEach(element => {
                    axios
                        .get('http://localhost:3000/team?id=' + element.team1)
                        .then(res => {
                            let team1 = res.data[0].name;
                            let idTeam1 = res.data[0].discordId;
                        })
                    axios
                        .get('http://localhost:3000/team?id=' + element.team2)
                        .then(res => {
                            let team2 = res.data[0].name;
                            let idTeam2 = res.data[0].discordId;
                        })

                });

            })
    }

}