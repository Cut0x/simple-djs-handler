# Simple Discord.js Handler

<ul>
<li><a href="">What is `simple-djs-handler` ?</a></li>
<li><a href="">Credits</a></li>
<li><a href="">How to contribute ?</a></li>
<li><a href="">Tutorial</a></li>
</ul>

# What is `simple-djs-handler` ?

`simple-djs-handler` is a module to simplify the development of Discord bots using Discord.js.

# Documentation
For more detailed usage and configuration information, [see the full documentation](https://simple-djs-handler.glitch.me).
In the documentation you can find all the explanations and examples to get started with the module!

## Installation
```bash
npm install simple-djs-handler
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
- `BotClient({ options })` -> Main class for your Discord bot, extended from Discord.js Client.
- `BotEvent({ options })` -> A class to handle Discord events in a simplified way.
- `BotCommand({ options })` -> A class to handle Discord slash commands in a simplified way.

# Need help ?
Join my discord server [(click here !)](https://discord.gg/aTX6FP37pK) or contact me on twitter [(Click here !)](https://twitter.com/cut0x_) !