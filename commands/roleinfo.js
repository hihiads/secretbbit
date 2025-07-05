const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'roleinfo',
  description: 'Get info about a role.',
  aliases: [],
  execute(message, args) {
    const role = message.mentions.roles.first();
    if (!role) return message.reply('Please mention a role.');

    const embed = new MessageEmbed()
      .setTitle(`Role Info: ${role.name}`)
      .addField('ID', role.id, true)
      .addField('Color', role.hexColor, true)
      .addField('Hoisted', role.hoist ? 'Yes' : 'No', true)
      .addField('Mentionable', role.mentionable ? 'Yes' : 'No', true)
      .addField('Members', `${role.members.size}`, true)
      .setColor(role.hexColor);

    message.channel.send({ embeds: [embed] });
  },
};
