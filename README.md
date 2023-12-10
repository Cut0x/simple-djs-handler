# :diamond_shape_with_a_dot_inside: Simple Discord.js Handler

## :question: Summary
<ul>
<li><a href="?tab=readme-ov-file#what-is-simple-djs-handler-">:hotsprings: What is `simple-djs-handler` ?</a></li>
<li><a href="?tab=readme-ov-file#credits">:hotsprings: Credits</a></li>
<li><a href="?tab=readme-ov-file#how-to-contribute-">:hotsprings: How to contribute ?</a>
<ul>
<li><a href="?tab=readme-ov-file#create-new-issues">:large_blue_circle: New issues</a></li>
<li><a href="?tab=readme-ov-file#on-discord">:large_blue_circle: On Discord</a></li>
<li><a href="?tab=readme-ov-file#on-twitter-𝕏">:large_blue_circle: On Twitter (&Xopf;)</a></li>
</ul></li>
<li><a href="">:hotsprings: Tutorial</a>
<ul>
<li><a href="">:large_blue_circle: Get Started</a></li>
<li><a href="">:large_blue_circle: Create Application</a></li>
</ul></li>
<li><a href="">:hotsprings: Free host</a>
<ul>
<li><a href="">:large_blue_circle: Get Started</a></li>
</ul></li>

# :diamond_shape_with_a_dot_inside: What is `simple-djs-handler` ?

This module allows you to simplify the structure of your Discord bot while keeping the code clean and readable. It is entirely coded in JavaScript with NodeJs. To use this module you need to know the basics of JavaScript and Discord.js.
You will find everything that is useful to use the discord.js module as little as possible, the module being constantly improved, it will be easy for you to improve your bots!

What's incredible is that you too can participate in improving the module!
To find out more, head to the <a href="https://github.com/Cut0x/simple-djs-handler/issues/new">How to contribute</a> category.

# :diamond_shape_with_a_dot_inside: Credits

[![My Awesome Stats](https://awesome-github-stats.azurewebsites.net/user-stats/Cut0x?cardType=level-alternate&theme=vue-dark&preferLogin=false&Border=462ADD&Background=6137DD&Text=000000&Title=000000&Ring=000000)](https://git.io/awesome-stats-card)

# :diamond_shape_with_a_dot_inside: How to contribute ?

## Create new issues
You can <a href="">create a new issue</a> to share your idea which may no doubt be added in the future.
![Issues](./src/Assets/image.png) ![New issue](./src/Assets/image-1.png) ![Alt text](./src/Assets/image-2.png) ![Alt text](./src/Assets/image-3.png)

## On Discord
You can <a href="https://discord.gg/aTX6FP37pK ">join my discord server</a>, go to the "programmation" forum room and create a new post with the tag `simple-djs-handl`.

## On Twitter (&Xopf;)
You can also contact me by private message <a href="https://twitter.com/cut0x_">directly on Twitter</a>!

# :diamond_shape_with_a_dot_inside: Tutorial

## Get Started
To get started, you need to install <a href="">NodeJs</a> <i>(the recommended version)</i> so that everything works during testing. As for the code editor, by preference, I recommend <a href="">Visual Studio Code</a> <i>(configurable as you wish)</i>.

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