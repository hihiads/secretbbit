const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const prefixes = require('./commands/prefixes.json');
const path = require('path');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

// Komande
client.commands = new Collection();
client.slashCommands = new Collection();

// Učitaj klasične komande iz foldera ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    client.commands.set(command.name, command);
}

// Učitaj slash komande iz foldera ./slashcommands
const slashCommandFiles = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));
for (const file of slashCommandFiles) {
    const command = require(path.join(__dirname, 'slashcommands', file));
    client.slashCommands.set(command.data.name, command);
}

// Događaj kada je bot spreman
client.once('ready', async () => {
    console.log(`${client.user.tag} is online!`);

    // Registracija slash komandi globalno
    const commands = client.slashCommands.map(cmd => cmd.data.toJSON());

    try {
        await client.application.commands.set(commands);
        console.log('Slash commands registered globally!');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
});

// Događaj za svaki primljeni message
client.on('messageCreate', message => {
    // Proveravamo da li je poruka poslata u DM-u ili je od bota
    if (!message.guild || message.author.bot) return;

    // Dohvati prefiks za trenutni server ili koristi podrazumevani prefiks
    const prefix = prefixes[message.guild.id] || prefixes['default'];

    // Ako poruka ne počinje prefiksom, zanemari je
    if (!message.content.startsWith(prefix)) return;

    // Parsiraj komandu i argumente
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Pronađi komandu u kolekciji komandi
    let command = client.commands.get(commandName);

    // Ako komanda ne postoji, proveri da li postoji kao alias
    if (!command) {
        command = client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    }

    // Ako komanda ne postoji, prekini
    if (!command) return;

    // Izvrši komandu
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }
});

// Događaj za interakcije (slash komande)
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error executing that command.', ephemeral: true });
            }
        }
    }
});

// Zamijenite 'YOUR_BOT_TOKEN' s vašim pravim tokenom bota

// Učitavanje quick.db modula



// Definirajte koje intents vaš bot koristi


// Događaj kada se bot uspješno poveže na Discor
// Događaj kada stigne nova poruka (komanda)


// Zamijenite 'YOUR_BOT_TOKEN' s vašim pravim tokenom bota

// Učitavanje quick.db modula

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('.help | snagapiksela.net', { type: 'PLAYING' });
});




// Replace 'YOUR_BOT_TOKEN' with your actual bot token


const express = require("express");
const app = express()

app.listen(300, () => {
  console.log("Project is running!");
})

app.get("/", (req, res) => {
  res.send("Hello world!");
})




// dinci.m i chatgpt

client.login(process.env.token)
