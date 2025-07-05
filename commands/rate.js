module.exports = {
  name: 'rate',
  description: 'Rates anything you type.',
  execute(message, args) {
    const thing = args.join(' ');
    if (!thing) return message.reply('Tell me what to rate!');
    const rating = Math.floor(Math.random() * 10) + 1;
    message.channel.send(`I'd give **${thing}** a ${rating}/10! 😎`);
  },
};
