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
        const args = message.content.slice(1).trim().split(/ +/);
        console.log(args);
        axios
            .post('http://localhost:3000/score', {
                "id": parseInt(args[1]),
                "scoreA": parseInt(args[2]),
                "scoreB": parseInt(args[3])
            })
            .then(res => {
                message.reply(res)
            })
            .catch(error => {
                console.error(error)
            })
    }
}