const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Bans a member from the server',
  aliases: ["b"],
  permissions: [Permissions.FLAGS.BAN_MEMBERS],
  async execute(message, args) {
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(' ') || 'No reason provided';

    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return message.reply('You do not have sufficient permissions to use this command!');
    }

    if (!user) {
      return message.reply('Please mention the member you want to ban.');
    }

    if (!message.guild.members.cache.has(user.id)) {
      return message.reply('That user is not a member of this server.');
    }

    if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return message.reply('I do not have permission to ban users on this server.');
    }

    // Proceed with banning the user
    try {
      await message.guild.members.ban(user, { reason: reason });
    } catch (error) {
      console.error('Error while banning the user:', error);
      return message.reply('There was an error while attempting to ban the user.');
    }

    try {
      // Send embed message in the user's DM
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('▬▬▬▬SD▬▬▬▬')
        .setDescription(`You have been banned from ${message.guild.name}`)
        .addField('Reason', reason)
        .addField("‍  ", "**▬▬▬▬Ban System▬▬▬▬**");

      await user.send({ embeds: [embed] });

      return message.reply(`User ${user.tag} has been successfully banned. Reason: ${reason}`);
    } catch (error) {
      console.error('Error while sending DM to the user:', error);
      return message.reply('The user was banned, but there was an error while attempting to send a DM.');
    }
  },
};
