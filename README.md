# :diamond_shape_with_a_dot_inside: Simple Discord.js Handler

## :diamond_shape_with_a_dot_inside: Tutorial

### :question: Get Started
To get started, you need to install <a href="">NodeJs</a> <i>(the recommended version)</i> so that everything works during testing. As for the code editor, by preference, I recommend <a href="">Visual Studio Code</a> <i>(configurable as you wish)</i>.

### :question: Create Application
Visit the <a href="https://discord.com/developers/applications">Discord Developer Portal</a> to create your app.
![Alt text](https://valloic.dev/imgs/sdjsh/image-4.png)
![Alt text](https://valloic.dev/imgs/sdjsh/image-5.png)
![Alt text](https://valloic.dev/imgs/sdjsh/image-6.png)
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
![Alt text](https://valloic.dev/imgs/sdjsh/image-7.png)
For `YOUR_CLIENT_ID`, return to the **General Information** page and enter your bot's ID using this button circled in red in the attached image.
![Alt text](https://valloic.dev/imgs/sdjsh/image-8.png)
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


# :diamond_shape_with_a_dot_inside: Free host

### :question: Get starting
To get started, you need to create an account at <a href="https://nexcord.com/">Nexcord.com</a>.<br>
<i>Note that their support bot **Nao** uses this module.</i><br>
Also note that **Nexcord** is the best hosting you can find, whether for web hosting (nginx), python, nodejs, java, C and much more!