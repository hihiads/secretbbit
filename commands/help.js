const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'help',
  description: 'List all available commands.',
  async execute(message) {
    const commandsPath = path.join(__dirname);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && file !== 'help.js');

    const embeds = [];
    let embed = new MessageEmbed()
      .setTitle('📜 Available Commands')
      .setColor('#0099ff')
      .setDescription('Here is a list of all my commands with descriptions:')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    let fieldCount = 0;

    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file));

      // Dodaj polje
      embed.addField(`.${command.name}`, command.description || 'No description provided.');
      fieldCount++;

      // Ako je polja 25, pošalji embed i napravi novi
      if (fieldCount === 25) {
        embeds.push(embed);
        embed = new MessageEmbed()
          .setColor('#0099ff')
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp();
        fieldCount = 0;
      }
    }

    // Dodaj zadnji embed ako ima polja
    if (fieldCount > 0) embeds.push(embed);

    // Pošalji sve embedove jedan za drugim
    for (const e of embeds) {
      await message.channel.send({ embeds: [e] });
    }
  },
};
