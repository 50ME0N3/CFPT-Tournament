/**
 * @Author Antoine Davet, Alexandre Pintrand, Jérémie Arcidiacono
 * @description send the updated score to the website
 * @date 25.11.21
 * @project Tournois
 */
const axios = require("axios");
const {Message, Client} = require("discord.js");
const config = require('../../config.json')
const logger = require('../../../logger.js').logger

module.exports = {
    name: "setScore",
    description: "Permet de donner les scores",
    aliases: ['ss', 'setScore'],
    /**
     * send the updated score to the website
     *
     * @param client client discordJS
     * @param message le message
     * @returns {Promise<void>} tkt jsp ce que c'est mais c'est la
     */
    run: async (client, message) => {
        const args = message.content.slice(1).trim().split(/ +/);
        if (args.length < 4) {
            message.reply("la commande est incomplète")
        } else if (parseInt(args[1]) > 13 || parseInt(args[1]) < 0) {
            message.reply("l'id du match n'éxiste pas")
        } else if (parseInt(args[2]) > 2 || parseInt(args[3]) > 2) {
            message.reply("les scores ne peuvent pas être plus grand que 2")
        } else {
            axios
                .post(config.IpAPI + 'score', {
                    API_KEY: config.API_KEY,
                    id: parseInt(args[1]),
                    scoreA: parseInt(args[2]),
                    scoreB: parseInt(args[3])
                })
                .then(res => {
                    if (res.data === "alert") {
                        client.users.fetch(config.MainAdminUserId, false).then((user) => {
                            user.send("un match est cassé.  L'id est " + args[1]);
                        })
                        logger.log('warn', `BOT - ${message.author.username} with id ${message.author.id} has set a score. The score is different the admin has been warned. The score was ${args[2]} : ${args[3]}`)
                        message.reply("Le score est différent, un message a été envoyé a l'admin.")
                    } else if (res.data === "score added") {
                        logger.log('info', `BOT - ${message.author.username} with id ${message.author.id} has set a score.`)
                        message.reply("Le score envoyé a été et est en cours de vérification");
                    } else {
                        logger.log('info', `BOT - ${message.author.username} with id ${message.author.id} has set a score. The score is the same as the previous one.`)
                        message.reply("Les scores ont été vérifés");
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }
}