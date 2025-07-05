module.exports = {
  name: 'nuke',
  description: 'Clone the channel and delete the old one (dangerous!).',
  aliases: [],
  async execute(message) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('You do not have permission to do this!');

    const channel = message.channel;
    const newChannel = await channel.clone();
    await channel.delete();
    newChannel.send('💣 **Channel has been nuked!**');
  },
};
