const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Unlock the current channel.'),

    async execute(interaction) {
        const channel = interaction.channel;

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: true });
            await interaction.reply(`Channel **${channel.name}** has been unlocked.`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error trying to unlock this channel.', ephemeral: true });
        }
    },
};
