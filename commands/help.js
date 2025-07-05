const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'help',
  description: 'List all available commands.',
  async execute(message) {
    const commandsPath = path.join(__dirname);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && file !== 'help.js');

    const embed = new MessageEmbed()
      .setTitle('📜 Available Commands')
      .setColor('#0099ff')
      .setDescription('Here is a list of all my commands with descriptions:')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file));
      embed.addField(`.${command.name}`, command.description || 'No description provided.');
    }

    message.channel.send({ embeds: [embed] });
  },
};

