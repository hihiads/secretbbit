const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'serverroles',
  description: 'Lists all roles on the server.',
  aliases: ['roles', 'rolenames'],
  execute(message, args) {
    const roles = message.guild.roles.cache
      .filter(role => role.name !== '@everyone')
      .map(role => role.toString())
      .join(', ') || 'No roles found.';

    const embed = new MessageEmbed()
      .setColor('#2f3136')
      .setTitle(`Roles on ${message.guild.name}`)
      .setDescription(roles)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

    message.channel.send({ embeds: [embed] }).catch(console.error);
  },
};

