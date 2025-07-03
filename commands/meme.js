const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'meme',
  description: 'Sends a random meme from Reddit.',
  aliases: ['mem', 'funny'],
  async execute(message, args) {
    try {
      // Fetch a random meme from Reddit
      const response = await fetch('https://www.reddit.com/r/memes/random/.json');
      const data = await response.json();

      const post = data[0].data.children[0].data;

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(post.title)
        .setURL(`https://reddit.com${post.permalink}`)
        .setImage(post.url)
        .setFooter(`👍 ${post.ups} | 💬 ${post.num_comments}`);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.channel.send('⚠️ Unable to fetch a meme right now. Please try again later!');
    }
  },
};
