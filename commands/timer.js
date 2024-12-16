module.exports = {
  name: 'timer',
  description: 'Sets a timer for a specified amount of seconds.',
  usage: '<time_in_seconds>',
  aliases: ['t'],
  execute(message, args) {
    // Check if the correct number of arguments are provided
    if (args.length !== 1) {
      return message.reply('Invalid input. Usage: !timer <time_in_seconds>');
    }

    const timeInSeconds = parseInt(args[0], 10);

    // Check if the provided time is valid
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
      return message.reply('Please enter a valid number of seconds.');
    }

    message.reply(`Timer set for ${timeInSeconds} seconds.`);

    setTimeout(() => {
      message.reply(`The timer for ${timeInSeconds} seconds has expired.`);
    }, timeInSeconds * 1000);
  },
};
