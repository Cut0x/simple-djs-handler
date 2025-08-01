const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        // Handle slash commands
        if (interaction.isChatInputCommand()) {
            const command = client.slashCommands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            // Cooldown system
            const { cooldowns } = client;
            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name) || cooldowns.set(command.data.name, new Map()).get(command.data.name);
            const defaultCooldownDuration = 3;
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    return interaction.reply({
                        content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
                        ephemeral: true
                    });
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            // Execute command
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}:`, error);
                
                const errorMessage = {
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                };

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMessage);
                } else {
                    await interaction.reply(errorMessage);
                }
            }
        }
        
        // Handle autocomplete
        else if (interaction.isAutocomplete()) {
            const command = client.slashCommands.get(interaction.commandName);

            if (!command || !command.autocomplete) {
                console.error(`No autocomplete handler for ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(`Error in autocomplete for ${interaction.commandName}:`, error);
            }
        }
        
        // Handle button interactions
        else if (interaction.isButton()) {
            // You can add button handling logic here
            console.log(`Button ${interaction.customId} was clicked by ${interaction.user.tag}`);
        }
        
        // Handle select menu interactions
        else if (interaction.isStringSelectMenu()) {
            // You can add select menu handling logic here
            console.log(`Select menu ${interaction.customId} was used by ${interaction.user.tag}`);
        }
    }
};