# Simple Discord.js Handler

## :question: Summary
<ul>
<li><a href="">:hotsprings: What is `simple-djs-handler` ?</a></li>
<li><a href="">:hotsprings: Credits</a></li>
<li><a href="">:hotsprings: How to contribute ?</a></li>
<li><a href="">:hotsprings: Tutorial</a></li>
</ul>

# What is `simple-djs-handler` ?

This module allows you to simplify the structure of your Discord bot while keeping the code clean and readable. It is entirely coded in JavaScript with NodeJs. To use this module you need to know the basics of JavaScript and Discord.js.
You will find everything that is useful to use the discord.js module as little as possible, the module being constantly improved, it will be easy for you to improve your bots!

What's incredible is that you too can participate in improving the module!
To find out more, head to the <a href="">How to contribute</a> category.

# Credits

[![My Awesome Stats](https://awesome-github-stats.azurewebsites.net/user-stats/Cut0x?cardType=level-alternate&theme=vue-dark&preferLogin=false&Border=462ADD&Background=6137DD&Text=000000&Title=000000&Ring=000000)](https://git.io/awesome-stats-card)

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