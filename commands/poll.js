const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'poll',
  description: 'Create a new poll',
  execute(message, args) {
    // Combine all arguments into a single string for the poll question
    const pollQuestion = args.join(' ');
    
    if (!pollQuestion) {
      return message.reply('Please provide a question for the poll.');
    }

    // Create an embed for the poll
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Poll')
      .setDescription('Vote on this poll using reactions!')
      .addField('Poll Question', pollQuestion);

    // Send the poll embed and add reactions for voting
    message.channel.send({ embeds: [embed] })
      .then(sentMessage => {
        sentMessage.react('⬆️'); // Upvote reaction
        sentMessage.react('⬇️'); // Downvote reaction
      })
      .catch(console.error);
  },
};
