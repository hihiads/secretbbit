const translate = require('@vitalets/google-translate-api');

module.exports = {
  name: 'translate',
  description: 'Translates text to specified language.',
  async execute(message, args) {
    const lang = args.shift();
    const text = args.join(' ');
    if (!lang || !text) return message.reply('Usage: .translate <lang> <text>');

    try {
      const res = await translate(text, { to: lang });
      message.channel.send(`Translated: ${res.text}`);
    } catch (error) {
      console.error(error);
      message.reply('Translation failed.');
    }
  },
};
