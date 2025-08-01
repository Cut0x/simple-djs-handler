const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`✅ ${client.user.tag} is online!`);
        
        // Set bot status
        client.user.setPresence({
            activities: [{
                name: 'with Discord.js v14',
                type: ActivityType.Playing
            }],
            status: 'online'
        });

        // Setup auto-moderation for all guilds
        for (const guild of client.guilds.cache.values()) {
            await client.createAutoModRules(guild);
        }

        console.log(`📊 Bot is in ${client.guilds.cache.size} guilds`);
        console.log(`👥 Serving ${client.users.cache.size} users`);
        console.log(`⚡ Loaded ${client.slashCommands.size} slash commands`);
        console.log(`🔧 Loaded ${client.prefixCommands.size} prefix commands`);
    }
};