const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Mute a member on the server',
  permissions: [Permissions.FLAGS.MANAGE_ROLES],
  aliases: ["m"],
  async execute(message, args) {
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(' ') || 'No reason provided';

    // Check if the user has the necessary permissions
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return message.reply('You do not have sufficient permissions to use this command!');
    }

    // Check if a user was mentioned
    if (!user) {
      return message.reply('Please mention a member to mute.');
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply('That user is not a member of this server.');
    }

    // Check if the "Muted" role exists, create it if not
    let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          name: 'Muted',
          color: '#000000',
          permissions: [],
        });

        // Set permissions for the "Muted" role (e.g., cannot send messages)
        // You can adjust the permissions here depending on what you want muted users to be restricted from doing
      } catch (error) {
        console.error('Error creating "Muted" role:', error);
        return message.reply('There was an error trying to create the "Muted" role.');
      }
    }

    // Add the "Muted" role to the user
    try {
      await member.roles.add(muteRole);
    } catch (error) {
      console.error('Error adding "Muted" role to the user:', error);
      return message.reply('There was an error trying to add the "Muted" role to the user.');
    }

    // Send a DM to the muted user
    try {
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('▬▬▬▬SD▬▬▬▬')
        .setDescription(`You have been muted on ${message.guild.name}`)
        .addField('Reason', reason)
        .addField("‍  ", "**▬▬▬▬Mute System▬▬▬▬**");

      await user.send({ embeds: [embed] });

      return message.reply(`User ${user.tag} has been successfully muted. Reason: ${reason}`);
    } catch (error) {
      console.error('Error sending DM to the user:', error);
      return message.reply('User has been muted, but there was an error sending a DM.');
    }
  },
};
