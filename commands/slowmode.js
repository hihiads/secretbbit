const { Permissions } = require('discord.js');

module.exports = {
  name: 'slowmode',
  description: 'Sets slowmode on the channel.',
  aliases: ["sm"],
  execute(message, args) {
    // Check if the user has the required permissions
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return message.reply('You do not have permission to use this command.');
    }

    // Get the slowmode duration from arguments
    const time = parseInt(args[0], 10);

    // Validate the provided time
    if (isNaN(time) || time < 0) {
      return message.reply('Please provide a valid time in seconds for slowmode.');
    }

    // Set the slowmode on the current channel
    message.channel.setRateLimitPerUser(time)
      .then(() => {
        message.channel.send(`Slowmode has been set to ${time} seconds in this channel.`);
      })
      .catch((error) => {
        console.error('Error setting slowmode:', error);
        message.channel.send('An error occurred while setting slowmode.');
      });
  },
};
