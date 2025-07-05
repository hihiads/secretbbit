const compliments = [
  "You're amazing!",
  "You're a genius!",
  "You're so kind!",
  "Your energy is contagious!",
  "You light up the room!"
];

module.exports = {
  name: 'compliment',
  description: 'Sends a compliment to a user.',
  execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.reply('Mention someone to compliment!');

    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    message.channel.send(`${user}, ${compliment} 🥰`);
  },
};
