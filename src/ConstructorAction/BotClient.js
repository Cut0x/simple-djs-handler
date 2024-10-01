
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { loadCommands } = require('../FunctionsInitializer/Commands');
const { loadEvents } = require('../FunctionsInitializer/Events');

class BotClient extends Client {
    constructor(options) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        });

        this.token = options.token;
        this.commands = new Collection();
        this.slashCommandsEnabled = options.slashCommandsEnabled;
        this.slashCommandsClientId = options.slashCommandsClientId;

        this.loadAll();
    }

    // Load all commands and events dynamically
    async loadAll() {
        try {
            await loadCommands(this);
            await loadEvents(this);
        } catch (error) {
            console.error('Error loading commands or events:', error);
        }
    }

    // Start the bot and log errors if any
    start() {
        this.login(this.token)
            .then(() => console.log('Bot logged in successfully!'))
            .catch(error => {
                console.error('Failed to log in:', error);
                process.exit(1);
            });
    }
}

module.exports = { BotClient };
