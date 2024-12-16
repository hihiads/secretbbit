const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vote',
    description: 'Provides a link to vote for the bot on Top.gg',
    execute(message, args) {
        const voteEmbed = new MessageEmbed()
            .setColor('#5865F2') // Boja embed poruke (možeš promeniti)
            .setTitle('Vote for the Bot!')
            .setDescription('Press [this](https://top.gg/bot/1164976245902151840) to vote!') // Link za glasanje
            .setFooter('Thank you for your support!');

        message.channel.send({ embeds: [voteEmbed] }); // Ova linija šalje embed poruku u kanal
    }
};
