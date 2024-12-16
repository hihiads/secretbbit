const { Permissions, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'button',
  description: 'Counts how many times the button is clicked',
  aliases: ["c"],
  async execute(message, args) {
    // Check if the user is an administrator or has the appropriate message management permissions
    if (
      !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) &&
      !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
    ) {
      return message.reply('You do not have permission to use this command!');
    }

    // Send a message with a button
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('button_click')
        .setLabel('Click me!')
        .setStyle('PRIMARY')
    );
    const sentMessage = await message.channel.send({
      content: 'Click the button to count!',
      components: [row],
    });

    // Initialize the counter
    let count = 0;

    // Create a component collector
    const filter = (interaction) =>
      interaction.isButton() && interaction.customId === 'button_click';
    const collector = sentMessage.createMessageComponentCollector({
      filter,
      time: 60000, // Collector time limit (e.g., 1 minute)
    });

    // Track components
    collector.on('collect', (interaction) => {
      // Increment the counter
      count++;

      // Edit the message with the new count
      interaction.update({
        content: `Click the button to count!\nNumber of clicks: ${count}`,
        components: [row],
      });
    });

    // Notify the user that the command has been activated
    message.channel.send('The command has been activated!');

    // End of the collector
    collector.on('end', () => {
      // Notify the user that the command has been deactivated
      message.channel.send('The command has been deactivated!');
    });
  },
};
