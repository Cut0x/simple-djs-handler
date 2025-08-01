const { Client, Collection, REST, Routes, GatewayIntentBits } = require('discord.js');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');
const colors = require('colors');

class BotClient extends Client {
    constructor(options = {}) {
        const defaultOptions = {
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.AutoModerationConfiguration,
                GatewayIntentBits.AutoModerationExecution
            ],
            allowedMentions: {
                parse: ['users', 'roles'],
                repliedUser: false
            }
        };

        super({ ...defaultOptions, ...options });

        // Configuration
        this.config = {
            token: options.token,
            clientId: options.clientId || options.client_id,
            guildId: options.guildId || null, // Pour les commandes de guilde spécifiques
            prefix: options.prefix || '!',
            enableSlashCommands: options.enableSlashCommands !== false,
            enablePrefixCommands: options.enablePrefixCommands !== false,
            enableAutoMod: options.enableAutoMod !== false,
            commandsPath: options.commandsPath || './commands',
            eventsPath: options.eventsPath || './events',
            logger: options.logger || console
        };

        // Collections
        this.slashCommands = new Collection();
        this.prefixCommands = new Collection();
        this.aliases = new Collection();
        this.cooldowns = new Collection();
        this.autoModRules = new Collection();

        // Auto-bind methods
        this.loadEvents = this.loadEvents.bind(this);
        this.loadCommands = this.loadCommands.bind(this);
        this.deploySlashCommands = this.deploySlashCommands.bind(this);
        this.setupAutoModeration = this.setupAutoModeration.bind(this);
    }

    /**
     * Load all events from the events directory
     */
    async loadEvents() {
        const eventsPath = join(process.cwd(), this.config.eventsPath);
        
        try {
            const eventFiles = this.getFiles(eventsPath, '.js');
            
            for (const file of eventFiles) {
                const event = require(file);
                const eventName = event.name || event.data?.name;
                
                if (!eventName) {
                    this.log('warn', `Event file ${file} is missing a name property`);
                    continue;
                }

                if (event.once) {
                    this.once(eventName, (...args) => event.execute(...args, this));
                } else {
                    this.on(eventName, (...args) => event.execute(...args, this));
                }

                this.log('success', `Event loaded: ${eventName}`);
            }
        } catch (error) {
            this.log('error', `Error loading events: ${error.message}`);
        }
    }

    /**
     * Load all commands from the commands directory
     */
    async loadCommands() {
        const commandsPath = join(process.cwd(), this.config.commandsPath);
        
        try {
            const commandFiles = this.getFiles(commandsPath, '.js');
            
            for (const file of commandFiles) {
                const command = require(file);
                
                // Slash Commands
                if (command.data && this.config.enableSlashCommands) {
                    this.slashCommands.set(command.data.name, command);
                    this.log('success', `Slash command loaded: ${command.data.name}`);
                }
                
                // Prefix Commands
                if (command.name && this.config.enablePrefixCommands) {
                    this.prefixCommands.set(command.name, command);
                    
                    if (command.aliases) {
                        command.aliases.forEach(alias => {
                            this.aliases.set(alias, command.name);
                        });
                    }
                    
                    this.log('success', `Prefix command loaded: ${command.name}`);
                }
            }
        } catch (error) {
            this.log('error', `Error loading commands: ${error.message}`);
        }
    }

    /**
     * Deploy slash commands to Discord
     */
    async deploySlashCommands() {
        if (!this.config.enableSlashCommands || this.slashCommands.size === 0) {
            return;
        }

        const commands = [];
        this.slashCommands.forEach(command => {
            commands.push(command.data.toJSON());
        });

        const rest = new REST({ version: '10' }).setToken(this.config.token);

        try {
            this.log('info', 'Started refreshing application (/) commands.');

            if (this.config.guildId) {
                // Guild-specific commands (faster deployment)
                await rest.put(
                    Routes.applicationGuildCommands(this.config.clientId, this.config.guildId),
                    { body: commands }
                );
            } else {
                // Global commands (takes up to 1 hour)
                await rest.put(
                    Routes.applicationCommands(this.config.clientId),
                    { body: commands }
                );
            }

            this.log('success', `Successfully deployed ${commands.length} slash commands.`);
        } catch (error) {
            this.log('error', `Error deploying slash commands: ${error.message}`);
        }
    }

    /**
     * Setup auto-moderation rules
     */
    async setupAutoModeration() {
        if (!this.config.enableAutoMod) return;

        try {
            // Auto-mod rules will be set up per guild when the bot joins or on ready
            this.log('info', 'Auto-moderation system enabled');
        } catch (error) {
            this.log('error', `Error setting up auto-moderation: ${error.message}`);
        }
    }

    /**
     * Create default auto-moderation rules for a guild
     */
    async createAutoModRules(guild) {
        if (!this.config.enableAutoMod) return;

        try {
            // Example auto-mod rules
            const rules = [
                {
                    name: 'Block Spam',
                    enabled: true,
                    triggerType: 3, // SPAM
                    actions: [
                        {
                            type: 1, // BLOCK_MESSAGE
                            metadata: {
                                customMessage: 'Your message was blocked due to spam detection.'
                            }
                        }
                    ]
                },
                {
                    name: 'Block Bad Words',
                    enabled: true,
                    triggerType: 4, // KEYWORD_PRESET
                    triggerMetadata: {
                        presets: [1, 2, 3] // PROFANITY, SEXUAL_CONTENT, SLURS
                    },
                    actions: [
                        {
                            type: 1, // BLOCK_MESSAGE
                            metadata: {
                                customMessage: 'Your message contains inappropriate content.'
                            }
                        }
                    ]
                }
            ];

            for (const rule of rules) {
                try {
                    await guild.autoModerationRules.create(rule);
                    this.log('success', `Created auto-mod rule: ${rule.name} for ${guild.name}`);
                } catch (error) {
                    this.log('warn', `Failed to create auto-mod rule ${rule.name}: ${error.message}`);
                }
            }
        } catch (error) {
            this.log('error', `Error creating auto-mod rules: ${error.message}`);
        }
    }

    /**
     * Get all files recursively from a directory
     */
    getFiles(dir, extension) {
        const files = [];
        
        if (!require('fs').existsSync(dir)) {
            return files;
        }

        const items = readdirSync(dir);
        
        for (const item of items) {
            const itemPath = join(dir, item);
            const stat = statSync(itemPath);
            
            if (stat.isDirectory()) {
                files.push(...this.getFiles(itemPath, extension));
            } else if (item.endsWith(extension)) {
                files.push(itemPath);
            }
        }
        
        return files;
    }

    /**
     * Enhanced logging with colors
     */
    log(type, message) {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = `[${timestamp}]`;
        
        switch (type) {
            case 'success':
                console.log(`${prefix} ${'✓'.green} ${message.green}`);
                break;
            case 'error':
                console.log(`${prefix} ${'✗'.red} ${message.red}`);
                break;
            case 'warn':
                console.log(`${prefix} ${'⚠'.yellow} ${message.yellow}`);
                break;
            case 'info':
                console.log(`${prefix} ${'ℹ'.blue} ${message.blue}`);
                break;
            default:
                console.log(`${prefix} ${message}`);
        }
    }

    /**
     * Start the bot
     */
    async start() {
        try {
            // Load events first
            await this.loadEvents();
            
            // Load commands
            await this.loadCommands();
            
            // Setup auto-moderation
            await this.setupAutoModeration();
            
            // Login to Discord
            await this.login(this.config.token);
            
            // Deploy slash commands after login
            this.once('ready', async () => {
                await this.deploySlashCommands();
                this.log('success', `Bot is ready! Logged in as ${this.user.tag}`);
            });
            
        } catch (error) {
            this.log('error', `Failed to start bot: ${error.message}`);
            process.exit(1);
        }
    }
}

module.exports = { BotClient };