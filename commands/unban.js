const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unban',
  aliases: ['ub'],
  description: 'Removes a ban from a user on the server.',
  permissions: [Permissions.FLAGS.BAN_MEMBERS],
  async execute(message, args) {
    const userId = args[0];

    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return message.reply('You do not have permission to use this command!');
    }

    if (!userId) {
      return message.reply('Please provide the ID of the user you want to unban.');
    }

    try {
      // Attempt to unban the user by ID
      const bannedUsers = await message.guild.bans.fetch();
      const bannedUser = bannedUsers.get(userId);

      if (!bannedUser) {
        return message.reply('No user with the provided ID is banned on this server.');
      }

      await message.guild.members.unban(userId, `Unban command executed by ${message.author.tag}`);

      try {
        // Send an embed message in the user's DM
        const user = await message.client.users.fetch(userId);

        const embed = new MessageEmbed()
          .setColor('#00FF00')
          .setTitle('▬▬▬▬SD▬▬▬▬')
          .setDescription(`You have been unbanned from ${message.guild.name}`)
          .addField('Reason', 'No reason provided')
          .addField("‍  ", "**▬▬▬▬Unban system▬▬▬▬**");

        await user.send({ embeds: [embed] });

        return message.reply(`User with ID ${userId} has been successfully unbanned.`);
      } catch (error) {
        console.error('Error sending DM to user:', error);
        return message.reply('The user has been unbanned, but there was an error sending the DM.');
      }
    } catch (error) {
      console.error('Error unbanning user:', error);
      return message.reply('There was an error trying to unban the user.');
    }
  },
};
