const { Client, Collection, Intents } = require('discord.js');
const { REST, Routes } = require('discord.js');
const { Logger } = require('node-logger-simple');
const fs = require('fs');
const path = require('path');

/**
 * BotClient extends the discord.js Client to integrate:
 * - Bot configuration (token, client_id)
 * - Logger configuration (app_id, api_key)
 * - Dynamic command loading from a directory
 * - Global registration of slash commands
 * - Dynamic event loading from a directory
 * - Interaction handling (command execution)
 */
class BotClient extends Client {
  /**
   * @param {object} config - Bot configuration object.
   * Must include: 
   *  - token: Discord bot token,
   *  - client_id: Discord client ID,
   *  - logger: Logger configuration object { app_id, api_key },
   *  - intents: Array of Discord.js intents.
   */
  constructor(config) {
    if (!config || !config.token || !config.client_id || !config.logger) {
      throw new Error("Invalid configuration: token, client_id, and logger must be provided.");
    }
    const options = { intents: config.intents || [Intents.FLAGS.GUILDS] };
    super(options);

    this.config = config;
    this.commands = new Collection();
    this.events = new Collection();

    // Initialize the logger with the provided configuration
    this.logger = new Logger(config.logger);
    this.logger.logInfo("Logger initialized.");
  }

  /**
   * Loads commands from the specified directory.
   * Each command must export an object with:
   * - data: an instance of SlashCommandBuilder
   * - execute: an async function that handles the interaction
   *
   * @param {string} commandsPath - Path to the commands directory.
   */
  loadCommands(commandsPath) {
    const absolutePath = path.isAbsolute(commandsPath)
      ? commandsPath
      : path.join(process.cwd(), commandsPath);
    if (!fs.existsSync(absolutePath)) {
      this.logger.logInfo(`Directory not found: ${absolutePath}`);
      return;
    }

    const commandFiles = fs.readdirSync(absolutePath).filter(file => file.endsWith('.js'));
    if (commandFiles.length === 0) {
      //this.logger.logInfo(`No commands found in: ${absolutePath}`);
    }

    for (const file of commandFiles) {
      try {
        const command = require(path.join(absolutePath, file));
        if (command.data && command.execute) {
          this.commands.set(command.data.name, command);
          //this.logger.logSuccess(`Command loaded: ${command.data.name}`);
        } else {
          this.logger.logError(`Invalid command in ${file}. It must export 'data' and 'execute'.`);
        }
      } catch (err) {
        this.logger.logError(`Error found while loading command ${file}: ${err}`);
      }
    }
  }

  /**
   * Loads events from the specified directory.
   * Each event must export an object with:
   * - name: event name (string)
   * - once: boolean (optional, defaults to false)
   * - execute: an async function that handles the event
   *
   * @param {string} eventsPath - Path to the events directory.
   */
  loadEvents(eventsPath) {
    const absolutePath = path.isAbsolute(eventsPath)
      ? eventsPath
      : path.join(process.cwd(), eventsPath);
    if (!fs.existsSync(absolutePath)) {
      console.log(`Events directory not found: ${absolutePath}`);
      return;
    }

    const eventFiles = fs.readdirSync(absolutePath).filter(file => file.endsWith('.js'));
    if (eventFiles.length === 0) {
      console.log(`No events found in: ${absolutePath}`);
    }

    for (const file of eventFiles) {
      try {
        const event = require(path.join(absolutePath, file));
        if (event.name && event.execute) {
          if (event.once) {
            this.once(event.name, (...args) => event.execute(...args, this));
          } else {
            this.on(event.name, (...args) => event.execute(...args, this));
          }
          this.events.set(event.name, event);
        } else {
          this.logger.logError(`Invalid event in ${file}. It must export 'name' and 'execute'.`);
        }
      } catch (err) {
        this.logger.logError(`Error found while loading event ${file}: ${err}`);
      }
    }
  }

  /**
   * Registers slash commands globally via Discord's API.
   */
  async registerCommands() {
    const commandsData = this.commands.map(cmd => cmd.data.toJSON());
    const rest = new REST({ version: '10' }).setToken(this.config.token);
    try {
      await rest.put(
        Routes.applicationCommands(this.config.client_id),
        { body: commandsData }
      );
      //this.logger.logSuccess("Slash commands registered globally.");
    } catch (error) {
      this.logger.logError(`Error found during slash command registration: ${error}`);
    }
  }

  /**
   * Starts the bot.
   * - Connects to Discord.
   * - Registers commands upon connection.
   * - Loads events.
   * - Handles interactions (command execution).
   */
  start() {
    this.once('ready', async () => {
      this.logger.logSuccess(`Connected as ${this.user.tag}`);
      await this.registerCommands();
    });

    this.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return;

      const command = this.commands.get(interaction.commandName);
      if (!command) {
        this.logger.logError(`Command not found: ${interaction.commandName}`);
        return;
      }

      const client = interaction.client;
      const logger = this.logger;

      try {
        await command.execute(client, interaction, logger);
      } catch (error) {
        this.logger.logError(`Error found during execution of ${interaction.commandName}: ${error}`);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'An error occurred while executing this command.', ephemeral: true });
        } else {
          await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
        }
      }
    });

    process.on('unhandledRejection', error => {
      this.logger.logError(`Unhandled promise rejection: ${error}`);
    });

    this.login(this.config.token).catch(err => {
      this.logger.logError(`Error found during login: ${err}`);
    });
  }
}

module.exports = { BotClient };