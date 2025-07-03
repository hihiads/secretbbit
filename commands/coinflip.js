module.exports = {
  name: 'coinflip',
  description: 'Flips a coin and returns heads or tails.',
  aliases: ['flip', 'coin'],
  execute(message, args) {
    const results = ['Heads 🪙', 'Tails 🪙'];
    const choice = results[Math.floor(Math.random() * results.length)];
    message.channel.send(`You flipped: **${choice}**`);
  },
};
