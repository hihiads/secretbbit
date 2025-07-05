module.exports = {
  name: 'sayserver',
  description: 'Pošalje poruku u sve servere gdje @everyone može pisati.',
  async execute(message, args, client) {
    const ownerId = '990626592474677349'; // ⚠️ zamijeni svojim ID-om

    if (message.author.id !== ownerId) return message.reply('⛔ Nemaš dopuštenje za ovu komandu.');

    const sayMessage = args.join(' ');
    if (!sayMessage) return message.reply('⚠️ Moraš napisati poruku.');

    client.guilds.cache.forEach(guild => {
      const everyoneRole = guild.roles.everyone;

      const channel = guild.channels.cache.find(ch =>
        ch.type === 'GUILD_TEXT' &&
        ch.permissionsFor(guild.me)?.has(['SEND_MESSAGES', 'VIEW_CHANNEL']) &&
        ch.permissionsFor(everyoneRole)?.has('SEND_MESSAGES')
      );

      if (channel) {
        channel.send(sayMessage).catch(err => {
          console.warn(`❌ Couldn't send message to ${guild.name}: ${err.message}`);
        });
      }
    });

    message.reply('📨 Poruka je poslana u sve javne kanale.');
  }
};
