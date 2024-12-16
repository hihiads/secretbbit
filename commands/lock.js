module.exports = {
  name: 'lock',
  description: 'Locks the channel',
  aliases: ["l"],
  execute(message, args) {
    // Check if the user has the necessary permissions
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You do not have permission to lock channels.');
    }

    // Check if the channel is already locked
    if (message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) {
      message.channel.permissionOverwrites.create(message.guild.roles.everyone, {
        SEND_MESSAGES: false
      })
        .then(() => {
          message.reply('The channel has been successfully locked.');
        })
        .catch((error) => {
          console.error(error);
          message.reply('An error occurred while trying to lock the channel.');
        });
    } else {
      message.reply('The channel is already locked.');
    }
  },
};
