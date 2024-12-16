const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  name: 'join',
  description: 'Join a voice channel',
  async execute(message, args) {
    // Check if the user is in a voice channel
    const member = await message.guild.members.fetch(message.author.id);
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return message.reply('You need to be in a voice channel to use this command.');
    }

    // Check if the bot is already connected to the voice channel
    const existingConnection = getVoiceConnection(message.guild.id);
    if (existingConnection) {
      return message.reply('The bot is already connected to a voice channel.');
    }

    // Join the voice channel
    try {
      joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      message.reply(`Successfully joined the voice channel: ${voiceChannel.name}`);
    } catch (error) {
      console.error('Error while trying to join the voice channel:', error);
      message.reply('There was an error trying to join the voice channel.');
    }
  },
};
