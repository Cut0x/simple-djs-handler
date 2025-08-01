const { BotClient } = require('simple-djs-handler');
const { GatewayIntentBits } = require('discord.js');

// Create bot instance with configuration
const client = new BotClient({
    // Required
    token: 'YOUR_BOT_TOKEN',
    clientId: 'YOUR_CLIENT_ID',
    
    // Optional configurations
    guildId: 'YOUR_GUILD_ID', // For faster slash command deployment (dev mode)
    prefix: '!', // Default prefix for prefix commands
    
    // Feature toggles
    enableSlashCommands: true,    // Enable slash commands
    enablePrefixCommands: true,   // Enable prefix commands
    enableAutoMod: true,          // Enable auto-moderation
    
    // Paths (relative to your project root)
    commandsPath: './commands',   // Where your commands are stored
    eventsPath: './events',       // Where your events are stored
    
    // Discord.js client options
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
    ],
    
    // Additional Discord.js options
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: false
    }
});

// Start the bot
client.start();

// Optional: Handle process events
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});