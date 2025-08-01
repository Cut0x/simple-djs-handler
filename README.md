# Simple Discord.js Handler v8.0.0

Un module Discord.js v14+ puissant et simple à utiliser qui gère automatiquement les slash commands, les commandes prefix et l'auto-modération Discord.

## ✨ Fonctionnalités

- 🚀 **Slash Commands** - Support complet des commandes slash avec auto-complétion
- ⚡ **Commandes Prefix** - Support des commandes traditionnelles avec préfixe
- 🛡️ **Auto-Modération** - Intégration complète de l'API Auto-Modération Discord
- 📁 **Structure Modulaire** - Organisez vos commandes et événements dans des dossiers
- 🔄 **Hot Reload** - Rechargement automatique des commandes et événements
- ⏱️ **Système de Cooldown** - Gestion automatique des délais d'attente
- 🎯 **Badges Discord** - Obtenez les badges "Slash Commands" et "Auto-Moderation"
- 🎨 **Logging Coloré** - Logs avec couleurs pour un debugging facile

## 🏆 Badges Discord

Ce module vous aide à obtenir ces badges Discord Developer (pour votre bot) :
- ✅ **Slash Commands** - En utilisant les slash commands
- ✅ **Auto-Moderation** - En utilisant l'API Auto-Modération

## 📦 Installation

```bash
npm install simple-djs-handler
```

## 🚀 Démarrage Rapide

### 1. Configuration de base

```javascript
const { BotClient } = require('simple-djs-handler');
const { GatewayIntentBits } = require('discord.js');

const client = new BotClient({
    token: 'YOUR_BOT_TOKEN',
    clientId: 'YOUR_CLIENT_ID',
    prefix: '!',
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
    ]
});

client.start();
```

### 2. Structure des dossiers

```
votre-projet/
├── main.js
├── commands/
│   ├── ping.js
│   ├── automod.js
│   └── moderation/
│       └── ban.js
├── events/
│   ├── ready.js
│   ├── interactionCreate.js
│   ├── messageCreate.js
│   └── autoModerationActionExecution.js
└── package.json
```

## 📋 Configuration Complète

```javascript
const client = new BotClient({
    // Requis
    token: 'YOUR_BOT_TOKEN',
    clientId: 'YOUR_CLIENT_ID',
    
    // Optionnel
    guildId: 'YOUR_GUILD_ID',        // Pour un déploiement plus rapide (dev)
    prefix: '!',                      // Préfixe pour les commandes
    
    // Contrôles des fonctionnalités
    enableSlashCommands: true,        // Activer les slash commands
    enablePrefixCommands: true,       // Activer les commandes prefix
    enableAutoMod: true,              // Activer l'auto-modération
    
    // Chemins des fichiers
    commandsPath: './commands',       // Dossier des commandes
    eventsPath: './events',           // Dossier des événements
    
    // Options Discord.js
    intents: [/* vos intents */]
});
```

## 📝 Création de Commandes

### Commande Slash + Prefix

```javascript
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    // Configuration Slash Command
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Vérifie la latence du bot'),
    
    // Configuration Prefix Command
    name: 'ping',
    description: 'Vérifie la latence du bot',
    aliases: ['latency', 'pong'],
    cooldown: 5,
    
    // Exécution Slash Command
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setDescription(`Latence: ${interaction.client.ws.ping}ms`)
            .setColor('#00ff00');
            
        await interaction.reply({ embeds: [embed] });
    },
    
    // Exécution Prefix Command
    async execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setDescription(`Latence: ${client.ws.ping}ms`)
            .setColor('#00ff00');
            
        await message.reply({ embeds: [embed] });
    }
};
```

### Commande Slash Uniquement

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Affiche les informations d\'un utilisateur')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('L\'utilisateur à vérifier')
                .setRequired(false)
        ),
        
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        // Votre logique ici
    }
};
```

### Commande Prefix Uniquement

```javascript
module.exports = {
    name: 'say',
    description: 'Fait répéter un message au bot',
    aliases: ['repeat', 'echo'],
    permissions: ['SendMessages'],
    cooldown: 3,
    
    async execute(message, args, client) {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Veuillez fournir un message à répéter!');
        
        await message.channel.send(text);
        await message.delete();
    }
};
```

## 🎭 Création d'Événements

### Événement Ready

```javascript
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`✅ ${client.user.tag} est en ligne!`);
        
        // Configuration de l'auto-modération pour tous les serveurs
        for (const guild of client.guilds.cache.values()) {
            await client.createAutoModRules(guild);
        }
    }
};
```

### Événement Auto-Modération

```javascript
const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.AutoModerationActionExecution,
    async execute(autoModerationActionExecution, client) {
        const { action, guild, user, content } = autoModerationActionExecution;
        
        // Log de l'action
        console.log(`🛡️ Action auto-mod: ${user.tag} dans ${guild.name}`);
        
        // Envoi dans un canal de logs
        const logChannel = guild.channels.cache.find(ch => ch.name.includes('mod-log'));
        if (logChannel) {
            const embed = new EmbedBuilder()
                .setTitle('🛡️ Action Auto-Modération')
                .addFields(
                    { name: 'Utilisateur', value: user.tag, inline: true },
                    { name: 'Action', value: 'Message bloqué', inline: true }
                )
                .setColor('#ff6b6b')
                .setTimestamp();
                
            await logChannel.send({ embeds: [embed] });
        }
    }
};
```

## 🛡️ Auto-Modération

Le module configure automatiquement des règles d'auto-modération de base :

### Règles par défaut

- **Anti-Spam** - Détection et blocage du spam
- **Filtre de Mots** - Blocage des mots inappropriés
- **Anti-Mention Spam** - Limitation des mentions en masse

### Gestion manuelle

```javascript
// Dans votre événement ready ou guildCreate
await client.createAutoModRules(guild);

// Commande pour gérer les règles
// Utilisez la commande /automod fournie dans les exemples
```

## 🎛️ Options Avancées

### Permissions et Restrictions

```javascript
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un membre')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
        
    // Restrictions pour les commandes prefix
    permissions: [PermissionFlagsBits.BanMembers],
    guildOnly: true,
    
    async execute(interaction) {
        // Votre logique
    }
};
```

### Auto-complétion

```javascript
module.exports = {
    data: new SlashCommandBuilder()
        .setName('music')
        .addStringOption(option =>
            option
                .setName('song')
                .setDescription('Nom de la chanson')
                .setAutocomplete(true)
        ),
        
    async execute(interaction) {
        // Logique de la commande
    },
    
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = ['Song 1', 'Song 2', 'Song 3'];
        const filtered = choices.filter(choice => 
            choice.toLowerCase().includes(focusedValue.toLowerCase())
        );
        
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice }))
        );
    }
};
```

## 🔧 Méthodes Utiles

### Client

```javascript
// Logging avec couleurs
client.log('success', 'Message de succès');
client.log('error', 'Message d\'erreur');
client.log('warn', 'Message d\'avertissement');
client.log('info', 'Message d\'information');

// Créer des règles d'auto-modération
await client.createAutoModRules(guild);

// Recharger les commandes (utile pour le développement)
await client.loadCommands();
await client.deploySlashCommands();
```

## 🎯 Obtenir les Badges Discord

### Badge Slash Commands
1. Utilisez au moins une slash command
2. Déployez-la globalement (pas seulement sur votre serveur)
3. Attendez l'activation du badge (peut prendre quelques jours)

### Badge Auto-Moderation
1. Activez l'auto-modération (`enableAutoMod: true`)
2. Créez au moins une règle d'auto-modération
3. Utilisez l'API Auto-Modération (le module le fait automatiquement)

## 📚 Exemples Complets

Consultez le dossier `examples/` pour voir des implémentations complètes :
- Configuration complète du bot
- Commandes avancées avec auto-complétion
- Système d'auto-modération personnalisé
- Gestion des événements

## 🐛 Debugging

```javascript
// Activer les logs détaillés
process.env.DEBUG = 'true';

// Gérer les erreurs non capturées
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});
```

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Support

- GitHub Issues: [Issues](https://github.com/Cut0x/simple-djs-handler/issues)
- Discord: [Support Server](https://discord.gg/votre-serveur)

## 🔗 Liens Utiles

- [Discord.js Documentation](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Discord API Documentation](https://discord.com/developers/docs)

---

**Note:** Assurez-vous d'avoir Node.js 16.11.0 ou plus récent installé.