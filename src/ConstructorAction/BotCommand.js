const { SlashCommandBuilder } = require('discord.js');

class BotCommand {
    constructor(options) {
        this.data = new SlashCommandBuilder()
            .setName(options.name)
            .setDescription(options.description || 'No description provided.');

        if (options.options) {
            options.options.forEach(option => {
                const { type, name, description, required, options: subOptions } = option;

                switch (type) {
                    case 'STRING':
                        this.data.addStringOption(option => option
                            .setName(name)
                            .setDescription(description || 'No description provided.')
                            .setRequired(required)
                        );
                        break;
                    case 'USER':
                        this.data.addUserOption(option => option
                            .setName(name)
                            .setDescription(description || 'No description provided.')
                            .setRequired(required)
                        );
                        break;
                    case 'CHANNEL':
                        this.data.addChannelOption(option => option
                            .setName(name)
                            .setDescription(description || 'No description provided.')
                            .setRequired(required)
                        );
                        break;
                    case 'ROLE':
                        this.data.addRoleOption(option => option
                            .setName(name)
                            .setDescription(description || 'No description provided.')
                            .setRequired(required)
                        );
                        break;
                    case 'SUB_COMMAND':
                        this.data.addSubcommand(subcommand => {
                            subcommand
                                .setName(name)
                                .setDescription(description || 'No description provided.');

                            if (subOptions) {
                                subOptions.forEach(subOption => {
                                    const { type, name, description, required } = subOption;

                                    switch (type) {
                                        case 'STRING':
                                            subcommand.addStringOption(option => option
                                                .setName(name)
                                                .setDescription(description || 'No description provided.')
                                                .setRequired(required)
                                            );
                                            break;
                                        case 'USER':
                                            subcommand.addUserOption(option => option
                                                .setName(name)
                                                .setDescription(description || 'No description provided.')
                                                .setRequired(required)
                                            );
                                            break;
                                        case 'CHANNEL':
                                            subcommand.addChannelOption(option => option
                                                .setName(name)
                                                .setDescription(description || 'No description provided.')
                                                .setRequired(required)
                                            );
                                            break;
                                        case 'ROLE':
                                            subcommand.addRoleOption(option => option
                                                .setName(name)
                                                .setDescription(description || 'No description provided.')
                                                .setRequired(required)
                                            );
                                            break;
                                    }
                                });
                            }
                        });
                        break;

                    case 'SUB_COMMAND_GROUP':
                        this.data.addSubcommandGroup(subgroup => {
                            subgroup
                                .setName(name)
                                .setDescription(description || 'No description provided.');

                            if (subOptions) {
                                subOptions.forEach(subOption => {
                                    const { type, name, description, required } = subOption;

                                    switch (type) {
                                        case 'STRING':
                                            subgroup.addStringOption(option => option
                                                .setName(name)
                                                .setDescription(description || 'No description provided.')
                                                .setRequired(required)
                                            );
                                            break;
                                        case 'USER':
                                            subgroup.addUserOption(option => option
                                                .setName(name)
                                                .setDescription(description || 'No description provided.')
                                                .setRequired(required)
                                            );
                                            break;
                                        case 'CHANNEL':
                                            subgroup.addChannelOption(option => option
                                                .setName(name)
                                                .setDescription(description || 'No description provided.')
                                                .setRequired(required)
                                            );
                                            break;
                                        case 'ROLE':
                                            subgroup.addRoleOption(option => option
                                                .setName(name)
                                                .setDescription(description || 'No description provided.')
                                                .setRequired(required)
                                            );
                                            break;
                                    }
                                });
                            }
                        });
                        break;
                }
            });
        }

        this.execute = options.execute;
    }
}

module.exports = { BotCommand };
