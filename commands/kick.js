const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kicks a user from the server',
  aliases: ["k"],
  execute(message, args) {
    // Check if the user has the right permissions
    if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return message.reply('You do not have sufficient permissions to use this command!');
    }
    
    // Get the user to be kicked
    const member = message.mentions.members.first();
    
    // Check if a user was mentioned
    if (!member) {
      return message.reply('Please mention the user to be kicked!');
    }
    
    // Try to send a DM to the user before kicking them
    const embed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('▬▬▬▬SD▬▬▬▬')
      .setDescription(`You have been kicked from ${message.guild.name}`)
      .addField('Reason', 'Violation of server rules')
      .addField("‍  ", "**▬▬▬▬Kick System▬▬▬▬**");

    member.user.send({ embeds: [embed] })
      .catch((error) => {
        console.error('Error sending DM to the user:', error);
        // Continue with the kick even if the DM fails
      });

    // Kick the user from the server
    member.kick()
      .then(() => {
        message.reply(`User ${member.user.tag} has been successfully kicked from the server!`);
      })
      .catch((error) => {
        console.error(error);
        message.reply(`There was an error trying to kick ${member.user.tag}!`);
      });
  },
};
