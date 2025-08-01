const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    // Slash Command Configuration
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('Manage auto-moderation rules')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List all auto-moderation rules')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a new auto-moderation rule')
                .addStringOption(option =>
                    option
                        .setName('type')
                        .setDescription('Type of auto-moderation rule')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Keyword Filter', value: 'keyword' },
                            { name: 'Spam Detection', value: 'spam' },
                            { name: 'Mention Spam', value: 'mention' }
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('name')
                        .setDescription('Name for the rule')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('toggle')
                .setDescription('Enable or disable an auto-moderation rule')
                .addStringOption(option =>
                    option
                        .setName('rule_id')
                        .setDescription('ID of the rule to toggle')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Delete an auto-moderation rule')
                .addStringOption(option =>
                    option
                        .setName('rule_id')
                        .setDescription('ID of the rule to delete')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        ),

    // Prefix Command Configuration
    name: 'automod',
    description: 'Manage auto-moderation rules',
    permissions: [PermissionFlagsBits.ManageGuild],
    guildOnly: true,
    aliases: ['am', 'moderation'],

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case 'list':
                await this.listRules(interaction);
                break;
            case 'create':
                await this.createRule(interaction);
                break;
            case 'toggle':
                await this.toggleRule(interaction);
                break;
            case 'delete':
                await this.deleteRule(interaction);
                break;
        }
    },

    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
            return message.reply('❌ You need the "Manage Server" permission to use this command!');
        }

        const subcommand = args[0]?.toLowerCase();

        switch (subcommand) {
            case 'list':
                await this.listRulesPrefix(message);
                break;
            case 'create':
                await message.reply('❌ Creating auto-mod rules via prefix commands is not supported. Please use the slash command version.');
                break;
            default:
                await message.reply('❌ Invalid subcommand. Use: `list`, `create`, `toggle`, or `delete`');
        }
    },

    async listRules(interaction) {
        try {
            const rules = await interaction.guild.autoModerationRules.fetch();
            
            if (rules.size === 0) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('🛡️ Auto-Moderation Rules')
                            .setDescription('No auto-moderation rules found in this server.')
                            .setColor('#ffa726')
                    ]
                });
            }

            const embed = new EmbedBuilder()
                .setTitle('🛡️ Auto-Moderation Rules')
                .setColor('#4caf50')
                .setTimestamp();

            rules.forEach(rule => {
                const status = rule.enabled ? '✅ Enabled' : '❌ Disabled';
                const triggerType = this.getTriggerTypeName(rule.triggerType);
                
                embed.addFields({
                    name: `${rule.name} (ID: ${rule.id})`,
                    value: `**Status:** ${status}\n**Type:** ${triggerType}\n**Actions:** ${rule.actions.length} configured`,
                    inline: true
                });
            });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error listing auto-mod rules:', error);
            await interaction.reply({
                content: '❌ Failed to fetch auto-moderation rules.',
                ephemeral: true
            });
        }
    },

    async listRulesPrefix(message) {
        try {
            const rules = await message.guild.autoModerationRules.fetch();
            
            if (rules.size === 0) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('🛡️ Auto-Moderation Rules')
                            .setDescription('No auto-moderation rules found in this server.')
                            .setColor('#ffa726')
                    ]
                });
            }

            const embed = new EmbedBuilder()
                .setTitle('🛡️ Auto-Moderation Rules')
                .setColor('#4caf50')
                .setTimestamp();

            rules.forEach(rule => {
                const status = rule.enabled ? '✅ Enabled' : '❌ Disabled';
                const triggerType = this.getTriggerTypeName(rule.triggerType);
                
                embed.addFields({
                    name: `${rule.name} (ID: ${rule.id})`,
                    value: `**Status:** ${status}\n**Type:** ${triggerType}\n**Actions:** ${rule.actions.length} configured`,
                    inline: true
                });
            });

            await message.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error listing auto-mod rules:', error);
            await message.reply('❌ Failed to fetch auto-moderation rules.');
        }
    },

    async createRule(interaction) {
        const type = interaction.options.getString('type');
        const name = interaction.options.getString('name');

        try {
            let ruleData = {
                name: name,
                enabled: true,
                actions: [
                    {
                        type: 1, // BLOCK_MESSAGE
                        metadata: {
                            customMessage: `Your message was blocked by the "${name}" auto-moderation rule.`
                        }
                    }
                ]
            };

            switch (type) {
                case 'keyword':
                    ruleData.triggerType = 4; // KEYWORD_PRESET
                    ruleData.triggerMetadata = {
                        presets: [1, 2, 3] // PROFANITY, SEXUAL_CONTENT, SLURS
                    };
                    break;
                case 'spam':
                    ruleData.triggerType = 3; // SPAM
                    break;
                case 'mention':
                    ruleData.triggerType = 5; // MENTION_SPAM
                    ruleData.triggerMetadata = {
                        mentionTotalLimit: 5
                    };
                    break;
            }

            const rule = await interaction.guild.autoModerationRules.create(ruleData);

            const embed = new EmbedBuilder()
                .setTitle('✅ Auto-Moderation Rule Created')
                .setColor('#4caf50')
                .addFields(
                    { name: 'Name', value: rule.name, inline: true },
                    { name: 'ID', value: rule.id, inline: true },
                    { name: 'Type', value: this.getTriggerTypeName(rule.triggerType), inline: true }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error creating auto-mod rule:', error);
            await interaction.reply({
                content: '❌ Failed to create auto-moderation rule. Make sure the bot has the necessary permissions.',
                ephemeral: true
            });
        }
    },

    async toggleRule(interaction) {
        const ruleId = interaction.options.getString('rule_id');

        try {
            const rule = await interaction.guild.autoModerationRules.fetch(ruleId);
            const newStatus = !rule.enabled;
            
            await rule.edit({ enabled: newStatus });

            const embed = new EmbedBuilder()
                .setTitle(`${newStatus ? '✅' : '❌'} Auto-Moderation Rule ${newStatus ? 'Enabled' : 'Disabled'}`)
                .setColor(newStatus ? '#4caf50' : '#f44336')
                .addFields(
                    { name: 'Rule', value: rule.name, inline: true },
                    { name: 'Status', value: newStatus ? 'Enabled' : 'Disabled', inline: true }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error toggling auto-mod rule:', error);
            await interaction.reply({
                content: '❌ Failed to toggle auto-moderation rule. Rule may not exist.',
                ephemeral: true
            });
        }
    },

    async deleteRule(interaction) {
        const ruleId = interaction.options.getString('rule_id');

        try {
            const rule = await interaction.guild.autoModerationRules.fetch(ruleId);
            await rule.delete();

            const embed = new EmbedBuilder()
                .setTitle('🗑️ Auto-Moderation Rule Deleted')
                .setColor('#f44336')
                .addFields({ name: 'Deleted Rule', value: rule.name })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error deleting auto-mod rule:', error);
            await interaction.reply({
                content: '❌ Failed to delete auto-moderation rule. Rule may not exist.',
                ephemeral: true
            });
        }
    },

    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        
        if (focusedOption.name === 'rule_id') {
            try {
                const rules = await interaction.guild.autoModerationRules.fetch();
                const choices = rules.map(rule => ({
                    name: `${rule.name} (${rule.enabled ? 'Enabled' : 'Disabled'})`,
                    value: rule.id
                }));

                const filtered = choices.filter(choice => 
                    choice.name.toLowerCase().includes(focusedOption.value.toLowerCase())
                );

                await interaction.respond(filtered.slice(0, 25));
            } catch (error) {
                console.error('Error in autocomplete:', error);
                await interaction.respond([]);
            }
        }
    },

    getTriggerTypeName(type) {
        const types = {
            1: 'Keyword',
            3: 'Spam',
            4: 'Keyword Preset',
            5: 'Mention Spam'
        };
        return types[type] || 'Unknown';
    }
};