module.exports = {
  name: 'antiraid',
  description: 'Lock or unlock all channels to prevent raids.',
  aliases: [],
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('You do not have permission to manage channels.');

    const action = args[0];
    if (!action || !['on', 'off'].includes(action)) return message.reply('Usage: .antiraid <on/off>');

    message.guild.channels.cache
      .filter(ch => ch.isTextBased() && ch.viewable)
      .forEach(async (channel) => {
        try {
          await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SEND_MESSAGES: action === 'on' ? false : true,
          });
        } catch (err) {
          console.error(`Failed to update ${channel.name}:`, err);
        }
      });

    if (action === 'on') {
      message.channel.send('🛑 **Antiraid mode activated!** All channels are now locked.');
    } else {
      message.channel.send('✅ **Antiraid mode deactivated!** All channels are now unlocked.');
    }
  },
};
