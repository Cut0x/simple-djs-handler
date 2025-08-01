const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    // Slash Command Configuration
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s latency and API response time'),
    
    // Prefix Command Configuration
    name: 'ping',
    description: 'Check the bot\'s latency and API response time',
    aliases: ['latency', 'pong'],
    cooldown: 5,
    
    // Slash Command Execution
    async execute(interaction) {
        const sent = await interaction.reply({ 
            content: '🏓 Pinging...', 
            fetchReply: true 
        });
        
        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setColor('#00ff00')
            .addFields(
                { 
                    name: '📡 Websocket Latency', 
                    value: `\`${interaction.client.ws.ping}ms\``, 
                    inline: true 
                },
                { 
                    name: '🔄 Roundtrip Latency', 
                    value: `\`${sent.createdTimestamp - interaction.createdTimestamp}ms\``, 
                    inline: true 
                },
                {
                    name: '⏱️ Uptime',
                    value: `\`${formatUptime(interaction.client.uptime)}\``,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({ text: 'Bot Status' });

        await interaction.editReply({ content: null, embeds: [embed] });
    },
    
    // Prefix Command Execution
    async execute(message, args, client) {
        const sent = await message.reply('🏓 Pinging...');
        
        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setColor('#00ff00')
            .addFields(
                { 
                    name: '📡 Websocket Latency', 
                    value: `\`${client.ws.ping}ms\``, 
                    inline: true 
                },
                { 
                    name: '🔄 Roundtrip Latency', 
                    value: `\`${sent.createdTimestamp - message.createdTimestamp}ms\``, 
                    inline: true 
                },
                {
                    name: '⏱️ Uptime',
                    value: `\`${formatUptime(client.uptime)}\``,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({ text: 'Bot Status' });

        await sent.edit({ content: null, embeds: [embed] });
    }
};

function formatUptime(uptime) {
    const seconds = Math.floor((uptime / 1000) % 60);
    const minutes = Math.floor((uptime / (1000 * 60)) % 60);
    const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}