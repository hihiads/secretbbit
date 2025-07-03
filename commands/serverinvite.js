module.exports = {
  name: 'serverinvite',
  description: 'Generates an invite link to the server.',
  aliases: ['invite', 'inv'],
  async execute(message, args) {
    try {
      // Pronađi kanal gdje bot može kreirati invite
      const channel = message.guild.channels.cache
        .filter(ch => ch.type === 'GUILD_TEXT' && ch.permissionsFor(message.guild.me).has('CREATE_INSTANT_INVITE'))
        .first();

      if (!channel) {
        return message.reply('I don\'t have permission to create an invite in any text channel.');
      }

      const invite = await channel.createInvite({ maxAge: 0, maxUses: 0, unique: true });

      message.channel.send(`Here is an invite to the server: ${invite.url}`);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to create an invite.');
    }
  },
};
