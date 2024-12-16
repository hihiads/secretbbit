module.exports = {
  name: 'purge',
  description: 'Briše određeni broj poruka',
  aliases: ["pr"],
  async execute(message, args) {
    // Provjeravamo da li korisnik ima odgovarajuće ovlasti (npr. administrator)
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply("You do not have permission to use this command");
    }

    // Uzimamo broj poruka koje želimo očistiti
    const brojPorukaZaOcistiti = parseInt(args[0]);

    // Provjeravamo da li je broj poruka ispravan
    if (isNaN(brojPorukaZaOcistiti) || brojPorukaZaOcistiti <= 0) {
      return message.reply('Please provide the right number.');
    }

    // Brišemo poruke
    try {
      const deletedMessages = await message.channel.bulkDelete(brojPorukaZaOcistiti, true);
      console.log("Uspešno obrisano ${deletedMessages.size} poruka.");
    } catch (error) {
      console.error('There was an error while deleting messages:', error);
      message.reply('There was an error while deleting your messages!');
    }
  },
};
