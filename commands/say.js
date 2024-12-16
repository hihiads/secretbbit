module.exports = {
  name: 'say',
  description: 'Repeat a message',
  aliases: ["s"],
  execute(message, args) {
    // Check if the user has the required permissions
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Check if there is a message to repeat
    if (!args.length) {
      return message.reply('Please provide a message to repeat.');
    }

    // Delete the original command message
    message.delete()
      .catch(error => console.error('Error deleting message:', error));

    // Combine arguments into a single message
    const replyMessage = args.join(' ');

    // Send the repeated message
    message.channel.send(replyMessage)
      .catch(error => console.error('Error sending message:', error));
  },
};
