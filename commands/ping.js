module.exports = {
    name: 'ping',
    aliases: ['latency', 'pong', 'p'],
    description: 'Pong! Shows the bot\'s latency.',
    execute(message) {
        const sent = Date.now();
        message.reply('Pong!').then(sentMessage => {
            const received = Date.now();
            const latency = received - sent;
            sentMessage.edit(`Pong! Latency is ${latency}ms.`);
        });
    },
};
