module.exports = {
    name: 'avatar',
    aliases: ['av', 'profilepic', 'p'],
    description: 'Displays the avatar of a user or the server.',
    execute(message, args) {
        let user;

        if (args.length) {
            user = message.mentions.users.first() || message.client.users.cache.find(u => u.username === args.join(' '));
        }

        if (!user) {
            user = message.author;
        }

        message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}`);
    },
};
