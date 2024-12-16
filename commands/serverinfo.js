const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: 'Displays information about the server.',
  aliases: ["si"],
  execute(message) {
    const serverInfoEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Server Information for ${message.guild.name}`)
      .addFields(
        { name: 'ID', value: `${message.guild.id}`, inline: true },
        { name: 'Owner', value: `${message.guild.owner}`, inline: true },
        { name: 'Member Count', value: `${message.guild.memberCount}`, inline: true },
        { name: 'Channel Count', value: `${message.guild.channels.cache.size}`, inline: true },
        { name: 'Created On', value: `${message.guild.createdAt.toDateString()}`, inline: true },
        { name: 'Region', value: `${message.guild.preferredLocale}`, inline: true }
      )
      .setTimestamp()
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));

    message.channel.send({ embeds: [serverInfoEmbed] });
  },
};
