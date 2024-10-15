
# ⚓ Simple Discord.js Handler

## ⚓ Tutorial

### ❓ Getting Started
To get started, you need to install [NodeJs](https://nodejs.org) (recommended version) to ensure everything works during testing. For the code editor, I recommend [Visual Studio Code](https://code.visualstudio.com).

### ❓ Create a Discord Application
Go to the [Discord Developer Portal](https://discord.com/developers/applications) to create your application. Follow the instructions and keep the page open to retrieve the necessary information later.

### ❓ Installation
To install the module, run the following command (this is where NodeJs comes in handy):
```bash
npm install simple-djs-handler
```

### ❓ Bot Configuration
You need to initialize your main file (which we'll call `main.js`) with the following code:

```js
const { BotClient } = require('simple-djs-handler');
const { GatewayIntentBits } = require('discord.js');

const client = new BotClient({
  token: 'YOUR_BOT_TOKEN',
  slashCommandsEnabled: true, // Required for the module to function properly!
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

- Replace `YOUR_BOT_TOKEN` with your bot's token. For this, go to the **Bot** section on the Discord Developer Portal.
- Replace `YOUR_CLIENT_ID` with your bot's ID, available in the **General Information** section.

Then, you can start your bot with the following command:
```bash
node main
```

The module will automatically create the `commands` and `events` folders.

### ❓ Event Configuration
Here's how to create a `Ready.js` file in the `./events/` folder (e.g., `./events/Ready.js`):

```js
const { BotEvent } = require('simple-djs-handler');
const { Events } = require('discord.js');

module.exports = new BotEvent({
    name: Events.ClientReady,
    once: true, // To execute the code only once
    execute(client) {        
      client.user.setActivity('Visual Studio Code');
    },
});
```

To handle slash commands, create the `InteractionCreate.js` file in the same `./events/` folder:

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
            console.log(`No matching command found for ${interaction.commandName}.`);
            return;
        }

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.log(`Error executing the command: ${error}`);
        }
    },
});
```

### ❓ Command Configuration
Here is an example structure for a command without options:

```js
const { BotCommand } = require('simple-djs-handler');

module.exports = new BotCommand({
    name: 'simple',
    description: 'A simple example command without options',
    execute: async (client, interaction) => {
        interaction.reply({
            content: "This is a simple command!"
        });
    },
});
```

And an example of a command with options:

```js
const { BotCommand } = require('simple-djs-handler');

module.exports = new BotCommand({
    name: 'example',
    description: 'An example command with options',
    options: [
        {
            name: 'example_option',
            description: 'An example option',
            type: 'STRING', // See the table below for other option types
            required: true, // false if the option is not mandatory
        },
        // ... add other options as needed
    ],
    execute: async (interaction) => {
        const stringOption = interaction.options.getString('example_option');
        // Your command logic here
    },
});
```

### ❓ Available Option Types

| Option             | Method to Retrieve              |
| ------------------ | -------------------------------- |
| `STRING`           | `getStringOption()`              |
| `USER`             | `addUserOption()`                |
| `CHANNEL`          | `addChannelOption()`             |
| `ROLE`             | `addRoleOption()`                |
| `SUBCOMMAND`       | `addSubcommand()`                |
| `SUB_COMMAND_GROUP`| `addSubcommandGroup()`           |

---