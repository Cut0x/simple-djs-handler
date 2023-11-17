const { Client, Collection } = require("discord.js");
const Logger = require("node-logger-simple");

class BotClient extends Client {
    constructor(options) {
        super(options);

        if (!options.token) {
            throw new Error("A bot token must be provided.");
        }

        if (!options.slashCommandsEnabled) {
            throw new Error("slashCommandsEnabled must be set to true.");
        }

        if (!options.slashCommandsClientId) {
            throw new Error("Client ID for slash commands deployment is required when slash commands are enabled.");
        }

        this.token = options.token;
        this.commands = new Collection();
        this.logger = new Logger({
            logFilePath: 'console.log'
        });
        this.slashCommandsEnabled = true;
        this.slashCommandsClientId = options.slashCommandsClientId;
    }

    async initializeEvents() {
        const EventsInitializer = require('../ConstructorInitializer/Events');
        await EventsInitializer.init(this);
    }

    async initializeCommands() {
        const CommandsInitializer = require('../ConstructorInitializer/Commands');
        await CommandsInitializer.init(this);
    }

    async DeploySlashCommands() {
        const SlashCommandsDeployer = require('../ConstructorInitializer/SlashCommands');
        await SlashCommandsDeployer.deploy(this);
    }
    
    async start() {
        try {
            await Promise.all([
                this.initializeEvents(),
                this.initializeCommands(),
                this.login(this.token),
                this.DeploySlashCommands()
            ]);
    
            this.logger.logSuccess("Bot is now online!");
            this.logger.logSuccess("All slash commands have been loaded!");
        } catch (error) {
            this.logger.logError(`An error occurred during bot startup: ${error.message}`);
        }
    }
}

module.exports = { BotClient };