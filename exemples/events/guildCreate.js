const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildCreate,
    async execute(guild, client) {
        console.log(`🎉 Bot ajouté au serveur: ${guild.name} (${guild.id})`);
        
        // Setup auto-moderation rules for the new guild
        if (client.config.enableAutoMod) {
            try {
                await client.createAutoModRules(guild);
                client.log('success', `Auto-moderation configured for ${guild.name}`);
            } catch (error) {
                client.log('error', `Failed to setup auto-mod for ${guild.name}: ${error.message}`);
            }
        }

        // Try to find a general channel to send a welcome message
        const channel = guild.channels.cache.find(channel => 
            channel.type === 0 && // Text channel
            (channel.name.includes('general') || 
             channel.name.includes('welcome') || 
             channel.name.includes('bot')) &&
            channel.permissionsFor(guild.members.me).has(['SendMessages', 'EmbedLinks'])
        ) || guild.systemChannel;

        if (channel) {
            const welcomeEmbed = new EmbedBuilder()
                .setTitle('🤖 Merci de m\'avoir ajouté!')
                .setDescription('Je suis un bot Discord moderne avec support des slash commands et de l\'auto-modération.')
                .setColor('#00ff00')
                .addFields(
                    { 
                        name: '⚡ Fonctionnalités', 
                        value: '• Slash Commands\n• Commandes Prefix (`' + client.config.prefix + '`)\n• Auto-Modération\n• Système de Cooldown', 
                        inline: true 
                    },
                    { 
                        name: '🚀 Pour commencer', 
                        value: `• Tapez \`/ping\` ou \`${client.config.prefix}ping\`\n• Utilisez \`/automod list\` pour voir les règles\n• Configurez vos permissions`, 
                        inline: true 
                    },
                    {
                        name: '🛡️ Auto-Modération',
                        value: client.config.enableAutoMod ? 
                            '✅ Configurée automatiquement\n• Anti-spam\n• Filtre de mots\n• Protection mentions' :
                            '❌ Désactivée',
                        inline: false
                    }
                )
                .setFooter({ 
                    text: 'Utilisez /help pour voir toutes les commandes disponibles',
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp();

            try {
                await channel.send({ embeds: [welcomeEmbed] });
            } catch (error) {
                client.log('warn', `Couldn't send welcome message in ${guild.name}: ${error.message}`);
            }
        }

        // Update bot stats
        client.log('info', `Bot Statistics:`);
        client.log('info', `  Servers: ${client.guilds.cache.size}`);
        client.log('info', `  Users: ${client.users.cache.size}`);
        client.log('info', `  Channels: ${client.channels.cache.size}`);
    }
};