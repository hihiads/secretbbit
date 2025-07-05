const axios = require('axios');

module.exports = {
  name: 'cat',
  description: 'Sends a random cat image.',
  async execute(message) {
    try {
      const res = await axios.get('https://api.thecatapi.com/v1/images/search');
      message.channel.send(res.data[0].url);
    } catch (error) {
      console.error(error);
      message.reply('Could not fetch a cat image 😿.');
    }
  },
};
