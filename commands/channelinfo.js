module.exports = {
    name: 'channelinfo',
    aliases: ['channel', 'infochannel', 'ci'],
    description: 'Displays information about the current channel.',
    execute(message) {
        const channel = message.channel;
        const channelInfo = `
**Channel Name:** ${channel.name}
**Channel ID:** ${channel.id}
**Channel Type:** ${channel.type}
**Created On:** ${new Date(channel.createdAt).toLocaleDateString()}
`;

        message.channel.send(channelInfo);
    },
};
