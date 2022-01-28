const { Message, Client } = require("discord.js");

module.exports = {
  name: "time",
  description: "retourne le temps",
  aliases: ["t",'time'],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let date = new Date();
    message.channel.send(
      "LastSync: " +
        date.getFullYear() +
        "-" +
        date.getMonth() +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
    );
  },
};
