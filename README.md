
# ⚓ Simple Discord.js Handler

## ❓ Getting Started
To get started, you need to install [NodeJs](https://nodejs.org) (recommended version) to ensure everything works during testing. For the code editor, I recommend [Visual Studio Code](https://code.visualstudio.com).

## ❓ Create a Discord Application
Go to the [Discord Developer Portal](https://discord.com/developers/applications) to create your application. Follow the instructions and keep the page open to retrieve the necessary information later.

## ❓ Installation
To install the module, run the following command (this is where NodeJs comes in handy):
```bash
npm install simple-djs-handler
```

## ❓ Bot Configuration
You need to initialize your main file (which we'll call `main.js`) with the following code:

```js
const { BotClient } = require('simple-djs-handler');
const { GatewayIntentBits } = require('discord.js');

const client = new BotClient({
  token: 'YOUR_BOT_TOKEN',
  client_id: 'YOUR_CLIENT_ID'
  
  logger: {
    app_id: 'LOGGER-SIMPLE_APP_ID',
    api_key: 'LOGGER-SIMPLE_APP_API_KEY'
  },
  
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    // ... add other intents as needed
  ],
});

client.start();
```

- Replace `YOUR_BOT_TOKEN` with your bot's token. For this, go to the **Bot** section on the Discord Developer Portal.
- Replace `YOUR_CLIENT_ID` with your bot's ID, available in the **General Information** section.
- Replace `LOGGER-SIMPLE_APP_ID` with your [Logger Simple](https://logger-simple.com) application ID.
- Replace `LOGGER-SIMPLE_APP_API_KEY` with your [Logger Simple](https://logger-simple.com) application API key.

Then, you can start your bot with the following command:
```bash
node main
```

## ❓ Event Configuration
Here's how to create a `Ready.js` file in the `./events/` folder (e.g., `./events/Ready.js`):

```js
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        // Your event logic here
    }
};
```


## ❓ Command Configuration
Here is an example structure for a command without options: *(`./commands` folder)*

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('simple')
        .setDescription('A simple example command without options'),
    execute: async (interaction) => {
        // Your command logic here
    },
};
```

And an example of a command with options:

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exemple')
        .setDescription('exemple slash command')
        .addUserOption(option =>
            option
                .setName('example_option')
                .setDescription('Exemple option')
        ),
    execute: async (interaction) => {
        const stringOption = interaction.options.getString('example_option');
        // Your command logic here
    },
};
```