const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embedsay',
    description: 'Generates an embed with the first word as title and the rest as description',
    execute(message, args) {
        // Provjera da li korisnik ima administratorske ovlasti
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send('You do not have permission to use this command!');
        }

        if (!args.length) {
            return message.channel.send('You need to provide some text!');
        }

        // Odmah briše korisnikovu poruku
        message.delete().catch(err => console.error('Failed to delete the message:', err));

        // Odvajanje prve riječi za naslov (title)
        const title = args[0];
        // Spajanje ostalih riječi za opis (description)
        const description = args.slice(1).join(' ');

        const embed = new MessageEmbed()
            .setTitle(title)                // Prva riječ u naslov
            .setDescription(description)    // Ostale riječi u opisu
            .setColor('#0099ff');           // Postavljanje boje

        message.channel.send({ embeds: [embed] });
    },
};
