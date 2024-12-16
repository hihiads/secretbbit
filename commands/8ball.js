module.exports = {
  data: {
    name: '8ball',
    description: 'Ask the 8-ball a question.',
  },
  async execute(interaction) {
    // Check if the user asked a question
    const args = interaction.options.getString('question');

    if (!args) {
      return interaction.reply('Please ask a question.');
    }

    // Define possible 8-ball answers
    const answers = [
      'Definitely.',
      'Sure.',
      'Without a doubt.',
      'You can count on it.',
      'Yes, definitely.',
      'Probably.',
      'The answer is unclear, try again.',
      'I am not sure, try again.',
      'Ask me later.',
      'Better not tell you now.',
      'I cannot predict it.',
      'It looks like no.',
      'Probably not.',
      'I hope not.',
      'No chance.'
    ];

    // Select a random answer from the array
    const answer = answers[Math.floor(Math.random() * answers.length)];

    // Send the answer to the user
    await interaction.reply(`🎱 ${answer}`);
  },
};

