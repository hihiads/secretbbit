const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        const commands = [];
        const slashCommandFiles = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));

        // Učitavanje svih slash komandi u format potreban za Discord API
        for (const file of slashCommandFiles) {
            const command = require(`../slashcommands/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '9' }).setToken(process.env.token); // Zamenite sa pravim tokenom

        try {
            console.log('Starting to refresh global (/) commands...');

            // Registrovanje globalnih komandi
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );

            console.log('(/) commands have been successfully registered.');
        } catch (error) {
            console.error('Error registering commands:', error);
        }
    },
};
