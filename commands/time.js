module.exports = {
    name: 'time',
    aliases: ['currenttime', 'now', 't'],
    description: 'Displays the current server time.',
    execute(message) {
        const currentTime = new Date().toLocaleTimeString();
        message.reply(`The current server time is ${currentTime}`);
    },
};
