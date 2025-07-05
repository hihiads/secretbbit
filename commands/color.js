const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'color',
  description: 'Displays the color of given hex code.',
  execute(message, args) {
    const hex = args[0];
    if (!hex || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
      return message.reply('Provide a valid hex color code, e.g. #ff0000');
    }

    const embed = new MessageEmbed()
      .setTitle(`Color preview: ${hex}`)
      .setColor(hex.startsWith('#') ? hex : `#${hex}`)
      .setDescription('Here is how this color looks!');

    message.channel.send({ embeds: [embed] });
  },
};
