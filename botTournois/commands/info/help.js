const { 
    Message, 
    Client, 
    MessageEmbed, 
    MessageActionRow, 
    MessageSelectMenu 
} = require("discord.js");

module.exports = {
    name: "help",
    aliases: ['h','help'],
    description: 'aide pour les commandes du bot',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // Object with emojis
        const emojis = {
            info: 'ℹ️',
            team: '🧑‍🤝‍🧑'
        }
        // Retrieve commands folders from the handler
        const directories = [
            ...new Set(client.commands.map(cmd => cmd.directory)),
        ];

        const formatString = (str) => 
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        // Retrieve the commands categories
        const categories = directories.map((dir) => {
            const getCommands = client.commands.filter(
                (cmd) => cmd.directory === dir
            ).map(cmd => {
                return {
                    name: cmd.name || 'pas de nom pour cette commande',
                    description: cmd.description || "pas de description pour cette commande",
                };
            });

            return {
                directory: formatString(dir),
                commands: getCommands,
            }
        });

        // Creates an embed with a description
        const embed = new MessageEmbed().setDescription(
            "Merci de choisir une catégorie dans le menu."
        );
        
        // Add components to the dropdown list in the menu
        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("help-menu")
                    .setPlaceholder('Merci de sélectionner une catégorie.')
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commandes de la catégorie : ${cmd.directory}`,
                                emoji: 
                                    emojis[cmd.directory.toLowerCase()] || null,
                            };
                        })
                    )
            ),
        ];

        // Waits the result and sends the message with the embed the components
        const initialMessage = await message.channel.send({
            embeds: [embed],
            components: components(false),
        });

        // Checks if the user that interacts with the menu is the user who used the command
        const filter = (interaction) => interaction.user.id === message.author.id;

        // Creates a message with the component
        const collector = message.channel.createMessageComponentCollector({ 
            filter, 
            componentType: 'SELECT_MENU', 
            //time: 500
        });

        collector.on('collect', (interaction) => {
            const [ directory ] = interaction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            );

            // Shows all commands from a category with their description
            const categoryEmbed = new MessageEmbed()
                .setTitle(`Commandes : ${directory}`)
                .setDescription('Voici la liste des commandes')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        };
                    })
                );

            interaction.update({ embeds: [categoryEmbed]})
        });

        collector.on('end', () => {
            initialMessage.edit({ components: components(true) });
        })
    },
}; 
