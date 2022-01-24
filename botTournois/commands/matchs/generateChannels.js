/**
 * @Author Antoine Davet, Alexandre Pintrand, Jérémie Arcidiacono
 * @description generate channel for all match with ready states
 * @date 25.11.21
 * @project Tournois
 */
const axios = require("axios");
const {Message, Client} = require("discord.js");

module.exports = {
    name: "generateChannels",
    aliases: ['gc','generateChannels'],
    /**
     * generate channel for all match with ready states
     *
     * @param client client discordJS
     * @param message le message
     * @returns {Promise<void>} tkt jsp ce que c'est mais c'est la
     */
    run: async (client, message) => {
        axios
            .get('localhost:3000/readyState',).then(
                res => {

                }
        )
    }

}