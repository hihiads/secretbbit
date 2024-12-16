const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays all available commands for SD Bot',
    execute(message, args) {
        const helpEmbed = new MessageEmbed()
            .setColor('#FF0000') // Set the color of the embed
            .setTitle('SD Bot Help Menu')
            .setDescription('Here’s a list of all the available commands. Use them wisely to manage and have fun in your server!')
            .addFields(
                { name: '**Moderation Commands**', value: `
                \`.ban <@user> [reason]\` - Ban a member from the server.
                \`.kick <@user> [reason]\` - Kick a member from the server.
                \`.mute <@user> [time]\` - Temporarily mute a member.
                \`.unban <@user>\` - Unban a member from the server.
                \`.warn <@user> [reason]\` - Warn a member for inappropriate behavior.
                \`.lock\` - Lock the current channel.
                \`.unlock\` - Unlock the current channel.
                \`.purge <number>\` - Delete a specified number of messages.
                \`.vckick <@user>\` - Kick a member from a voice channel.
                ` },
                { name: '**Fun Commands**', value: `
                \`.8ball <question>\` - Ask the magic 8ball a question.
                \`.avatar [@user]\` - Get the avatar of a user.
                \`.quote\` - Get a random inspirational quote.
                \`.say <message>\` - Make the bot say something.
                ` },
                { name: '**Utility Commands**', value: `
                \`.ping\` - Check the bot's ping to Discord.
                \`.poll <question>\` - Create a simple yes/no poll.
                \`.channelinfo\` - Get information about the current channel.
                \`.serverinfo\` - Get information about the server.
                \`.userinfo [@user]\` - Get information about a user.
                \`.join <channel>\` - Make the bot join a voice channel.
                \`.setprefix <new_prefix>\` - Change the bot's command prefix.
                \`.slowmode <time>\` - Set the slowmode for the current channel.
                \`.time\` - Get the current time.
                \`.timer <time>\` - Set a timer.
                ` }
            )
            .setFooter('Built by SD Studio | SnagaPiksela');

        message.channel.send({ embeds: [helpEmbed] });
    }
};

