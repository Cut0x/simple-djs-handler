# [simple-djs-handler](https://www.npmjs.com/package/simple-djs-handler)

`simple-djs-handler` is a module to simplify the development of Discord bots using Discord.js.

# Documentation
For more detailed usage and configuration information, [see the full documentation](https://simple-djs-handler.glitch.me).
In the documentation you can find all the explanations and examples to get started with the module!

## Installation
*with all these modules, we are good!*
```bash
npm install simple-djs-handler discord.js path fs
```


## Utilisation
```js
const { BotClient } = require('simple-djs-handler');
const { GatewayIntentBits } = require('discord.js');

const botOptions = {
  token: 'YOUR_BOT_TOKEN',
  slashCommandsEnabled: true, // true required for the module to function properly!
  slashCommandsClientId: 'YOUR_CLIENT_ID',
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    // ... add other intents as needed
  ],
};

const client = new BotClient(botOptions);

client.start();
```

# Features
- `BotClient()` -> Main class for your Discord bot, extended from Discord.js Client.
- `BotEvent()` -> A class or function to handle Discord events in a simplified way.
- `BotCommand()` -> A class or function to handle Discord slash commands in a simplified way.
