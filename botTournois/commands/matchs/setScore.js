/**
 * @Author Antoine Davet, Alexandre Pintrand, Jérémie Arcidiacono
 * @description send the updated score to the website
 * @date 25.11.21
 * @project Tournois
 */
const axios = require("axios");
const {Message, Client} = require("discord.js");

module.exports = {
    name: "setScore",
    aliases: ['ss'],

    /**
     * send the updated score to the website
     *
     * @param client client discordJS
     * @param message le message
     * @returns {Promise<void>} tkt jsp ce que c'est mais c'est la
     */
    run: async (client, message) => {
        message.reply("tkt on est la");
    }
}