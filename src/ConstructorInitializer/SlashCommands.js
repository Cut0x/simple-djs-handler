const fs = require("node:fs");
const { REST } = require("discord.js");
const { Routes } = require('discord-api-types/v9');

async function deploy(client) {
    if (!client.slashCommandsEnabled) {
        console.log('Slash commands deployment is disabled.');
        return;
    }

    if (!client.slashCommandsClientId) {
        console.log('Client ID for slash commands deployment is missing.');
        return;
    }

    const commands = [];
    
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const command = require(`../../../../commands/${file}`);
        commands.push(command.data.toJSON());
    }
    
    const rest = new REST({ version: '10' }).setToken(client.token);
    
    try {
        console.log(`Loading ${commands.length} application commands.`);
    
        const data = await rest.put(
            Routes.applicationCommands(client.slashCommandsClientId),
            { body: commands },
        );

        console.log(`Success! Loaded ${data.length} application commands.`);
    } catch (error) {
        console.log(`An error occurred while loading application commands: ${error.message}`);
    }
}

module.exports = { deploy };