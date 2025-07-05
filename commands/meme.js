const axios = require('axios');

module.exports = {
  name: 'meme',
  description: 'Sends a random meme.',
  async execute(message) {
    try {
      const res = await axios.get('https://meme-api.com/gimme');
      message.channel.send(res.data.url);
    } catch (error) {
      console.error(error);
      message.reply('Could not fetch meme 😢.');
    }
  },
};
