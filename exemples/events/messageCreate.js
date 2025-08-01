const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        // Ignore bots and system messages
        if (message.author.bot || message.system) return;

        // Check if message starts with prefix
        const prefix = client.config.prefix;
        if (!message.content.startsWith(prefix)) return;

        // Parse command and arguments
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Get command (check both name and aliases)
        const command = client.prefixCommands.get(commandName) || 
                       client.prefixCommands.get(client.aliases.get(commandName));

        if (!command) return;

        // Check permissions
        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply('❌ You don\'t have permission to use this command!');
            }
        }

        // Check if command is guild only
        if (command.guildOnly && !message.guild) {
            return message.reply('❌ This command can only be used in servers!');
        }

        // Cooldown system
        const { cooldowns } = client;
        const now = Date.now();
        const timestamps = cooldowns.get(command.name) || cooldowns.set(command.name, new Map()).get(command.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`⏰ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // Execute command
        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(`Error executing prefix command ${command.name}:`, error);
            message.reply('❌ There was an error trying to execute that command!');
        }
    }
};