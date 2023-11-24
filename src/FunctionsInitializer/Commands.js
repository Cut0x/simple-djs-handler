const fs = require("node:fs");
const path = require("node:path");

async function init(client) {
    const commandsPath = path.join(__dirname, '../../../..', 'commands');

    if (!fs.existsSync(commandsPath)) {
        fs.mkdirSync(commandsPath);
        console.log('Created "commands" directory.');
    }

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            throw new Error(`The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

module.exports = { init };
