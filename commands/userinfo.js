const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Displays information about a user.',
  aliases: ['ui'],
  execute(message, args) {
    // Get the user from mention, argument, or default to the message author
    const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;

    // Check if the user is in the server
    const member = message.guild.members.cache.get(user.id);

    // Create an embed message
    const embed = new MessageEmbed()
      .setColor('#00b0ff')
      .setTitle(`User Information: ${user.tag}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addField('ID', user.id, true)
      .addField('Created At', user.createdAt.toDateString(), true)
      .addField('Bot', user.bot ? 'Yes' : 'No', true);

    if (member) {
      embed.addField('Joined Server', member.joinedAt.toDateString(), true)
        .addField('Nickname', member.nickname || 'None', true)
        .addField('Roles', member.roles.cache.map(role => role.toString()).join(', '), true)
        .setFooter(`User is on server ${message.guild.name}`);
    } else {
      embed.setFooter('User is not on the server');
    }

    // Send the embed message to the channel
    message.channel.send({ embeds: [embed] })
      .catch(err => console.error(err));
  },
};
