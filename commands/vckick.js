const { Permissions } = require('discord.js');

module.exports = {
  name: 'voicekick',
  description: 'Kicks a user out of a voice channel.',
  aliases: ['vckick'],
  execute(message, args) {
    // Check if the command is run within a server
    if (!message.guild) {
      return message.reply('This command can only be used within a server!');
    }

    // Check if the user has the necessary permissions
    if (
      !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) &&
      !message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
    ) {
      return message.reply('You do not have permission to execute this command!');
    }

    // Check if a user is mentioned
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention a user to kick from the voice channel.');
    }

    // Check if the user is in the voice channel
    const member = message.guild.members.cache.get(user.id);
    if (!member || !member.voice.channel) {
      return message.reply('The user is not in a voice channel!');
    }

    // Kick the user out of the voice channel
    member.voice.disconnect()
      .then(() => {
        // Send a confirmation message
        message.channel.send(`User ${user.username} has been kicked from the voice channel.`);
      })
      .catch((error) => {
        console.error('Error kicking the user from the voice channel:', error);
        message.reply('There was an error trying to kick the user from the voice channel.');
      });
  },
};
