const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.AutoModerationActionExecution,
    async execute(autoModerationActionExecution, client) {
        const { action, guild, user, content, matchedKeyword, matchedContent } = autoModerationActionExecution;

        // Log auto-moderation action
        console.log(`🛡️ Auto-mod action executed in ${guild.name}:`);
        console.log(`   User: ${user.tag} (${user.id})`);
        console.log(`   Action: ${action.type === 1 ? 'Block Message' : 'Unknown'}`);
        console.log(`   Matched: ${matchedKeyword || matchedContent || 'N/A'}`);

        // Create log embed
        const logEmbed = new EmbedBuilder()
            .setTitle('🛡️ Auto-Moderation Action')
            .setColor('#ff6b6b')
            .addFields(
                { name: '👤 User', value: `${user.tag} (${user.id})`, inline: true },
                { name: '⚡ Action', value: action.type === 1 ? 'Block Message' : 'Unknown', inline: true },
                { name: '🎯 Trigger', value: matchedKeyword || matchedContent || 'Unknown', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Guild: ${guild.name}` });

        if (content) {
            logEmbed.addFields({ name: '💬 Original Content', value: `\`\`\`${content.slice(0, 1000)}\`\`\`` });
        }

        // Try to find a moderation log channel
        const logChannel = guild.channels.cache.find(channel => 
            channel.name.includes('mod-log') || 
            channel.name.includes('automod') || 
            channel.name.includes('logs')
        );

        if (logChannel && logChannel.permissionsFor(guild.members.me).has(['SendMessages', 'EmbedLinks'])) {
            try {
                await logChannel.send({ embeds: [logEmbed] });
            } catch (error) {
                console.error('Failed to send auto-mod log:', error);
            }
        }

        // Optional: Send DM to user (be careful about spam)
        if (action.metadata?.customMessage) {
            try {
                const dmEmbed = new EmbedBuilder()
                    .setTitle('⚠️ Message Blocked')
                    .setDescription(action.metadata.customMessage)
                    .setColor('#ffa726')
                    .addFields({ name: '🏠 Server', value: guild.name })
                    .setTimestamp();

                await user.send({ embeds: [dmEmbed] });
            } catch (error) {
                // User might have DMs disabled, which is fine
                console.log(`Could not DM user ${user.tag}: ${error.message}`);
            }
        }
    }
};