module.exports = {
  name: 'emojiinfo',
  description: 'Shows information about an emoji.',
  execute(message, args) {
    const emoji = args[0];
    if (!emoji) return message.reply('Provide an emoji.');

    const regex = /<a?:\w+:(\d+)>/;
    const match = emoji.match(regex);
    if (!match) return message.reply('Invalid custom emoji.');

    const id = match[1];
    const url = `https://cdn.discordapp.com/emojis/${id}.png`;

    message.channel.send(`Emoji URL: ${url}`);
  },
};
