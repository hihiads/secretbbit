const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unmute',
  description: 'Removes mute from a member on the server',
  permissions: [Permissions.FLAGS.MANAGE_ROLES],
  aliases: ['um'],
  async execute(message, args) {
    // Check if the user has the necessary permissions
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return message.reply('You do not have permission to use this command.');
    }

    // Get the user to unmute
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention the member you want to unmute.');
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply('This user is not a member of this server.');
    }

    // Check if the "Muted" role exists
    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    if (!muteRole) {
      return message.reply('The "Muted" role does not exist on this server.');
    }

    // Check if the member has the "Muted" role
    if (!member.roles.cache.has(muteRole.id)) {
      return message.reply('This user is not muted.');
    }

    // Remove the "Muted" role from the member
    try {
      await member.roles.remove(muteRole);
      message.reply(`Successfully unmuted ${user.tag}.`);
    } catch (error) {
      console.error('Error removing "Muted" role:', error);
      return message.reply('There was an error while trying to unmute the user.');
    }

    // Send a DM to the user about the unmute
    try {
      const embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('▬▬▬▬SD▬▬▬▬')
        .setDescription(`You have been unmuted in ${message.guild.name}`)
        .addField('Reason', 'No reason provided')
        .addField('Mute System', '**▬▬▬▬Mute System▬▬▬▬**');

      await user.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error sending DM to the user:', error);
      message.reply('User has been unmuted, but there was an error sending them a DM.');
    }
  },
};
