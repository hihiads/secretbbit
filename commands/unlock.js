// Import the necessary class from Discord.js
const { Permissions, ChannelType } = require('discord.js');

module.exports = {
  name: 'unlock',
  description: 'Unlocks the channel for messaging.',
  aliases: ['ul'],
  execute(message) {
    // Check if the user has the necessary permissions
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return message.reply('You do not have permission to use this command.');
    }

    // Check if the command is executed in a text channel
    if (message.channel.type !== ChannelType.GuildText) {
      return message.reply('This command can only be used in text channels.');
    }

    // Unlock the channel
    message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SEND_MESSAGES: true,
    })
      .then(() => {
        message.reply('The channel has been unlocked.');
      })
      .catch((error) => {
        console.error('Error unlocking the channel:', error);
        message.reply('There was an error unlocking the channel.');
      });
  },
};
