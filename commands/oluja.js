// commands/oluja.js

module.exports = {
  name: 'oluja',
  aliases: ["ol"],
  execute(message, args) {
    const područije1 = args[0];
    if (!područije1) {
      message.reply('Molim vas da navedete grad.');
      return;
    }

    const warningMessage = `🚧 UPOZORENJE 🚧\nSly je detektirao oluju u ${područije1}!!\nOdmah ulazite u kuće ovo nije test!!!\n\n-Hvala\nSly oluja sistem.`;

    message.channel.send(warningMessage)
      .then(() => {
        // Obriši komandu nakon slanja poruke
        message.delete();
      })
      .catch((error) => {
        console.error('Greška prilikom slanja poruke:', error);
      });
  },
};
