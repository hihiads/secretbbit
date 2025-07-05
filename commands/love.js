const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'love',
  description: 'Calculates love percentage between you and another user.',
  execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.reply('Please mention someone to calculate love with ❤️.');

    const love = Math.floor(Math.random() * 101);
    const embed = new MessageEmbed()
      .setTitle(`❤️ Love Score ❤️`)
      .setDescription(`${message.author.username} + ${user.username} = **${love}%** 💖`)
      .setColor('#ff4d6d');

    message.channel.send({ embeds: [embed] });
  },
};
