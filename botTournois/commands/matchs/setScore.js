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
        if(args.length < 4){
            message.reply("la commande est incomplète")
        }
        else if(parseInt(args[1]) > 13 || parseInt(args[1]) < 0){
            message.reply("l'id du match n'éxiste pas")
        }
        else if (parseInt(args[2]) > 2 || parseInt(args[3]) > 2) {
            message.reply("les scores ne peuvent pas être plus grand que 2")
        } else {
            axios
                .post('http://localhost:3000/score', {
                    "id": parseInt(args[1]),
                    "scoreA": parseInt(args[2]),
                    "scoreB": parseInt(args[3])
                })
                .then(res => {
                    if(res.data === "alert"){
                        client.users.fetch('419779265576435714', false).then((user) => {
                            user.send('un match est cassé');
                        });
                    }
                    else{
                        message.reply(res.data)
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }
}