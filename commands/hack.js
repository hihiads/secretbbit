module.exports = {
  name: 'hack',
  description: 'Pretends to hack a user (just for fun).',
  async execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.reply('Mention someone to hack!');

    const msg = await message.channel.send(`Initializing hack on ${user.username}... 💻`);

    setTimeout(() => msg.edit('🔎 Finding IP address...'), 2000);
    setTimeout(() => msg.edit('💣 Sending viruses...'), 4000);
    setTimeout(() => msg.edit('💰 Stealing Robux...'), 6000);
    setTimeout(() => msg.edit(`✅ Hack complete! ${user.username} has been "totally hacked" 😂.`), 8000);
  },
};
