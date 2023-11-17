const { SlashCommandBuilder } = require('discord.js');

class BotCommand {
    constructor(options) {
        this.data = new SlashCommandBuilder()
            .setName(options.name)
            .setDescription(options.description || 'No description provided.');

        if (options.options) {
            this.data.addOptions(options.options);
        }

        this.execute = options.execute;
    }
}

module.exports = { BotCommand };
