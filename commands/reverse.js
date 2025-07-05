module.exports = {
  name: 'reverse',
  description: 'Reverses your text.',
  execute(message, args) {
    const text = args.join(' ');
    if (!text) return message.reply('Please provide some text to reverse.');
    const reversed = text.split('').reverse().join('');
    message.channel.send(`🔁 ${reversed}`);
  },
};
