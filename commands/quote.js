const quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
    "In the middle of every difficulty lies opportunity. – Albert Einstein",
    "The best way to predict the future is to invent it. – Alan Kay",
    "Do not wait to strike till the iron is hot, but make it hot by striking. – William Butler Yeats"
];

module.exports = {
    name: 'quote',
    aliases: ['inspire', 'motivate', 'q'],
    description: 'Sends a random motivational quote.',
    execute(message) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        message.channel.send(randomQuote);
    },
};
