const { Client, CommandInteraction } = require("discord.js");

module.exports = {
     name: "time",
     description: "return time",
     type: 'CHAT_INPUT',
     /**
      *
      * @param {Client} client
      * @param {CommandInteraction} interaction
      * @param {String[]} args
      */
     run: async (client, interaction, args) => {
          let date = new Date();
          interaction.followUp({ content: "LastSync: " + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() });
     },
};
