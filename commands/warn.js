const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'warn',
  description: 'Warns a member on the server.',
  permissions: [Permissions.FLAGS.MANAGE_MESSAGES],
  aliases: ["o"],
  async execute(message, args) {
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(' ') || 'No reason provided';

    if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return message.reply('You do not have permission to use this command!');
    }

    if (!user) {
      return message.reply('Please mention a member to warn.');
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply('That user is not a member of this server.');
    }

    try {
      // Send an embed message in the user's DM
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('▬▬▬▬SD▬▬▬▬')
        .setDescription(`You have been warned in ${message.guild.name}`)
        .addField('Reason', reason)
        .addField("‍  ", "**▬▬▬▬Warning System▬▬▬▬**");

      await user.send({ embeds: [embed] });

      return message.reply(`Warned user ${user.tag}. Reason: ${reason}`);
    } catch (error) {
      console.error(error);
      return message.reply('There was an error trying to warn the user.');
    }
  },
};
