const fs = require("node:fs");
const path = require("node:path");

async function init(client) {
    const eventsPath = path.join(__dirname, '../../../..', 'events');

    if (!fs.existsSync(eventsPath)) {
        fs.mkdirSync(eventsPath);
        client.logger.logInfo('Created "events" directory.');
    }

    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}

module.exports = { init };