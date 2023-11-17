const fs = require("node:fs");
const { REST } = require("discord.js");
const { Routes } = require('discord-api-types/v9');

async function deploy(client) {
    if (!client.slashCommandsEnabled) {
        client.logger.logInfo('Slash commands deployment is disabled.');
        return;
    }

    if (!client.slashCommandsClientId) {
        client.logger.logError('Client ID for slash commands deployment is missing.');
        return;
    }

    const commands = [];
    
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.push(command.data.toJSON());
    }
    
    const rest = new REST({ version: '10' }).setToken(client.token);
    
    try {
        client.logger.logInfo(`Loading ${commands.length} application commands.`);
    
        const data = await rest.put(
            Routes.applicationCommands(client.slashCommandsClientId),
            { body: commands },
        );

        client.logger.logSuccess(`Success! Loaded ${data.length} application commands.`);
    } catch (error) {
        client.logger.logError(`An error occurred while loading application commands: ${error.message}`);
    }
}

module.exports = { deploy };