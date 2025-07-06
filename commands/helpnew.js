const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'List all available commands with descriptions, sorted by category.',
  aliases: ['h'],
  async execute(message) {
    const moderationCommands = `
\`.antiraid\` — Lock or unlock all channels to prevent raids.
\`.ban\` — Bans a member from the server.
\`.kick\` — Kicks a user from the server.
\`.lock\` — Locks the channel.
\`.massrole\` — Add or remove a role to/from all members.
\`.mute\` — Mute a member on the server.
\`.nuke\` — Clone the channel and delete the old one (dangerous!).
\`.purge\` — Delete a specified number of messages.
\`.unban\` — Removes a ban from a user on the server.
\`.unlock\` — Unlocks the channel for messaging.
\`.unmute\` — Removes mute from a member on the server.
\`.warn\` — Warns a member on the server.
\`.voicekick\` — Kicks a user out of a voice channel.
`;

    const funCommands = `
\`.8ball\` — Ask the magic 8ball a question.
\`.air\` — Breate air.
\`.button\` — Counts how many times the button is clicked.
\`.cat\` — Sends a random cat image.
\`.coinflip\` — Flips a coin and returns heads or tails.
\`.compliment\` — Sends a compliment to a user.
\`.hack\` — Pretends to hack a user (just for fun).
\`.love\` — Calculates love percentage between you and another user.
\`.meme\` — Sends a random meme.
\`.oluja\` — No description provided.
\`.quote\` — Sends a random motivational quote.
\`.rate\` — Rates anything you type.
\`.reverse\` — Reverses your text.
\`.rps\` — Play rock paper scissors against the bot.
`;

    // Dijelimo utilityCommands na dva dijela
    const utilityCommandsPart1 = `
\`.avatar\` — Displays the avatar of a user or the server.
\`.channelinfo\` — Displays information about the current channel.
\`.color\` — Displays the color of given hex code.
\`.embedsay\` — Generates an embed with the first word as title and the rest as description.
\`.emojiinfo\` — Shows information about an emoji.
\`.join\` — Join a voice channel.
\`.ping\` — Pong! Shows the bot's latency.
\`.poll\` — Create a new poll.
\`.say\` — Repeat a message.
\`.sayserver\` — Send a message to all servers where @everyone can write.
\`.serverinfo\` — Displays information about the server.
`;

    const utilityCommandsPart2 = `
\`.serverinvite\` — Generates an invite link to the server.
\`.serverroles\` — Lists all roles on the server.
\`.setprefix\` — Changes the bot prefix for this server.
\`.slowmode\` — Sets slowmode on the channel.
\`.time\` — Displays the current server time.
\`.timer\` — Sets a timer for a specified amount of seconds.
\`.translate\` — Translates text to specified language.
\`.userinfo\` — Displays information about a user.
\`.roleinfo\` — Get info about a role.
\`.weather\` — Get the weather information for a specific city.
`;

    const generalCommands = `
\`.undefined\` — No description provided.
\`.vote\` — Provides a link to vote for the bot on Top.gg.
`;

    const embed = new MessageEmbed()
      .setTitle('📜 Available Commands')
      .setColor('#0099ff')
      .setDescription('Here is a list of all my commands, organized by category:')
      .addField('🛡️ Moderation', moderationCommands)
      .addField('🎉 Fun', funCommands)
      .addField('💡 Utility (1/2)', utilityCommandsPart1)
      .addField('💡 Utility (2/2)', utilityCommandsPart2)
      .addField('🌐 General', generalCommands)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};
