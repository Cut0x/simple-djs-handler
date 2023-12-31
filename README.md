# :diamond_shape_with_a_dot_inside: Simple Discord.js Handler

### :question: Summary
<ul>
<li><a href="?tab=readme-ov-file#diamond_shape_with_a_dot_inside-what-is-simple-djs-handler-">:hotsprings: What is `simple-djs-handler` ?</a></li>
<li><a href="?tab=readme-ov-file#diamond_shape_with_a_dot_inside-credits">:hotsprings: Credits</a></li>
<li><a href="?tab=readme-ov-file#diamond_shape_with_a_dot_inside-how-to-contribute-">:hotsprings: How to contribute ?</a>
<ul>
<li><a href="?tab=readme-ov-file#question-create-new-issues">:large_blue_circle: New issues</a></li>
<li><a href="?tab=readme-ov-file#question-on-discord">:large_blue_circle: On Discord</a></li>
<li><a href="?tab=readme-ov-file#question-on-twitter-𝕏">:large_blue_circle: On Twitter (&Xopf;)</a></li>
</ul></li>
<li><a href="?tab=readme-ov-file#diamond_shape_with_a_dot_inside-tutorial">:hotsprings: Tutorial</a>
<ul>
<li><a href="?tab=readme-ov-file#question-get-started">:large_blue_circle: Get Started</a></li>
<li><a href="?tab=readme-ov-file#question-create-application">:large_blue_circle: Create Application</a></li>
<li><a href="?tab=readme-ov-file#question-installation">:large_blue_circle: Installation</a></li>
<li><a href="?tab=readme-ov-file#question-configure-the-bot">:large_blue_circle: Configure the bot</a></li>
<li><a href="?tab=readme-ov-file#question-events-config">:large_blue_circle: Events config</a></li>
<li><a href="?tab=readme-ov-file#question-commands-config">:large_blue_circle: Commands config</a></li>
<li><a href="?tab=readme-ov-file#question-all-options">:large_blue_circle: All options</a></li>
<li><a href="?tab=readme-ov-file#question-create-embed">:large_blue_circle: Create embed</a></li>
</ul></li>
<li><a href="?tab=readme-ov-file#diamond_shape_with_a_dot_inside-free-host">:hotsprings: Free host</a>
<ul>
<li><a href="?tab=readme-ov-file#question-get-started">:large_blue_circle: Get Started</a></li>
<li><a href="?tab=readme-ov-file#question-create-nodejs-server">:large_blue_circle: Create nodejs server</a></li>
<li><a href="?tab=readme-ov-file#question-transfert-files">:large_blue_circle: Transfert files</a></li>
<li><a href="?tab=readme-ov-file#question-install-modules">:large_blue_circle: Install modules</a></li>
<li><a href="?tab=readme-ov-file#question-start-the-bot">:large_blue_circle: Start the bot</a></li>
</ul></li>

# :diamond_shape_with_a_dot_inside: What is `simple-djs-handler` ?

This module allows you to simplify the structure of your Discord bot while keeping the code clean and readable. It is entirely coded in JavaScript with NodeJs. To use this module you need to know the basics of JavaScript and Discord.js.
You will find everything that is useful to use the discord.js module as little as possible, the module being constantly improved, it will be easy for you to improve your bots!

What's incredible is that you too can participate in improving the module!
To find out more, head to the <a href="https://github.com/Cut0x/simple-djs-handler/issues/new">How to contribute</a> category.

# :diamond_shape_with_a_dot_inside: Credits

[![My Awesome Stats](https://awesome-github-stats.azurewebsites.net/user-stats/Cut0x?cardType=level-alternate&theme=vue-dark&preferLogin=false&Border=462ADD&Background=6137DD&Text=000000&Title=000000&Ring=000000)](https://git.io/awesome-stats-card)

# :diamond_shape_with_a_dot_inside: How to contribute ?

### :question: Create new issues
You can <a href="">create a new issue</a> to share your idea which may no doubt be added in the future.
![Issues](./src/Assets/image.png) ![New issue](./src/Assets/image-1.png) ![Alt text](./src/Assets/image-2.png) ![Alt text](./src/Assets/image-3.png)

### :question: On Discord
You can <a href="https://discord.gg/aTX6FP37pK ">join my discord server</a>, go to the "programmation" forum room and create a new post with the tag `simple-djs-handl`.

### :question: On Twitter (&Xopf;)
You can also contact me by private message <a href="https://twitter.com/cut0x_">directly on Twitter</a>!

# :diamond_shape_with_a_dot_inside: Tutorial

### :question: Get Started
To get started, you need to install <a href="">NodeJs</a> <i>(the recommended version)</i> so that everything works during testing. As for the code editor, by preference, I recommend <a href="">Visual Studio Code</a> <i>(configurable as you wish)</i>.

### :question: Create Application
Visit the <a href="https://discord.com/developers/applications">Discord Developer Portal</a> to create your app.
![Alt text](./src/Assets/image-4.png)
![Alt text](./src/Assets/image-5.png)
![Alt text](./src/Assets/image-6.png)
And there you have it, you have created a Discord application! Leave the window open, for the rest, we will need the page.

### :question: Installation
To configure the module to 70%, you just need to install it with npm <i>(hence the usefulness of NodeJs)</i>.
```bash
npm install simple-djs-handler
```

### :question: Configure the bot
You must initialize your main file <i>(which we will call `main.js`)</i> with this code:
```js
const { BotClient } = require('simple-djs-handler');
const { GatewayIntentBits } = require('discord.js');

const client = new BotClient({
  token: 'YOUR_BOT_TOKEN',
  slashCommandsEnabled: true, // true required for the module to function properly!
  slashCommandsClientId: 'YOUR_CLIENT_ID',
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    // ... add other intents as needed
  ],
});

client.start();
```
In the `YOUR_BOT_TOKEN` section, go to the **Bot** category on **Discord Developer Portal** and click on the button circled in red in the attached image.
![Alt text](./src/Assets/image-7.png)
For `YOUR_CLIENT_ID`, return to the **General Information** page and enter your bot's ID using this button circled in red in the attached image.
![Alt text](./src/Assets/image-8.png)
Once all this is done, you can now do
```bash
node main
```
To launch the bot, the module will create the `commands` and `events` folder.

### :question: Events config
I'm going to make you the `Ready.js` file which you need to make in the `./events/` folder which leads to `./events/Ready.js`.
```js
const { BotEvent } = require('simple-djs-handler');
const { Events } = require('discord.js');

module.exports = new BotEvent({
    name: Events.ClientReady,
    once: true, // This allows the code to be executed only once, for other event files, do not put `once: true`
    execute(client) {        
      client.user.setActivity('Visual Studio Code')
    },
});
```
To create the slashcommands, I will also create the `InteractionCreate.js` file which will therefore be in the direction `./events/InteractionCreate.js`.
```js
const { BotEvent } = require('simple-djs-handler');
const { Events } = require('discord.js');

module.exports = new BotEvent({
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        const client = interaction.client;

        if (!command) {
            console.log(`No order match ${interaction.commandName} was found.`)
            return;
        }

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.log(`Erreur lors du lancement d'une commande : ${error}`);
        }
    },
});
```

### :question: Commands config
Here is the command structure with all the possibilities
```js
// Command without option

const { BotCommand } = require('simple-djs-handler');

module.exports = new BotCommand({
    name: 'simple',
    description: 'An simple example command without options',
    execute: async (client, interaction) => {
        interaction.reply({
            content: "it's a simple command !"
        })
    },
});
```
```js
// Command with option

const { BotCommand } = require('simple-djs-handler');

module.exports = new BotCommand({
    name: 'example',
    description: 'An example command with options',
    options: [
        // Add your custom options for SlashCommandBuilder here
        {
            name: 'example_option',
            description: 'An example option',
            type: 'STRING', // All options in the table below
            required: true, // false if it's not required
        },
        // ... other options
    ],
    execute: async (interaction) => {
        const stringOption = interaction.options.getString('exemple_option');
        // Your order logic here (see simple command example)
    },
});
```

### :question: All options
| Option  | Correspond |
| ------------- | ------------- |
| `STRING`  | `getStringOption()`  |
| `USER`  | `addUserOption()`  |
| `CHANNEL`  | `addChannelOption()`  |
| `ROLE`  | `addRoleOption()`  |
| `SUBCOMMAND`  | `addSubcommand()`  |
| `SUB_COMMAND_GROUP`  | `addSubcommandGroup()`  |

### :question: Create embed
To use embeds you need to use the json form of the structure, here is a complete embed:
```js
const { CreateEmbed } = require('simple-djs-handler');

const my_embed = new CreateEmbed({
	color: 0x0099ff,
	title: 'Some title',
	url: 'https://nexcord.com',
	author: {
		name: 'Some name',
		icon_url: 'icon_url',
		url: 'https://nexcord.com',
	},
	description: 'Some description here',
	thumbnail: {
		url: 'image_url',
	},
	fields: [
		{
			name: 'Regular field title',
			value: 'Some value here',
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
	],
	image: {
		url: 'image_url',
	},
	timestamp: new Date().toISOString(),
	footer: {
		text: 'Some footer text here',
		icon_url: 'icon_url',
	},
})

interaction.reply({
  embeds: [
    my_embed
  ]
})
```

# :diamond_shape_with_a_dot_inside: Free host

### :question: Get starting
To get started, you need to create an account at <a href="https://nexcord.com/">Nexcord.com</a>.<br>
<i>Note that their support bot **Nao** uses this module.</i><br>
Also note that **Nexcord** is the best hosting you can find, whether for web hosting (nginx), python, nodejs, java, C and much more!

### :question: Create nodejs server
In the **Server** category, you will press the button circled in red in the attached image
![Alt text](./src/Assets/image-9.png)

### :question: Transfert files
To transfer your files, go to the **Settings** category <i>(you should preferably install Filezilla to transfer the files)</i>
| Option  | Correspond |
| ------------- | ------------- |
| `Hote`  | `sftp://server.nexcord.com`  |
| `Username`  | `your username`  |
| `Password`  | `your password`  |
| `Port`  | `2022`  |
| ![Alt text](./src/Assets/image-10.png) |
| ![Alt text](./src/Assets/image-11.png) |

***WARNING!* Do not transfer the `node_modules` folder, it will take time, it will be quicker!**

### :question: Install modules
To install the modules, go to the **Startup** category in the **ADDITIONAL NODE PACKAGES** box, and you will simply put the name of this module there, `simple-djs-handler` ^^
![Alt text](./src/Assets/image-12.png)

### :question: Start the bot
To finish, go to the **Console** category and click the button circled in red in the attached image
![Alt text](./src/Assets/image-13.png)