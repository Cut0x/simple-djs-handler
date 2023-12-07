const { EmbedBuilder } = require('discord.js');

class CreateEmbed {
    constructor(options) {
        this.title = options.title || null;
        this.description = options.description || null;
        this.color = options.color || null;
        this.fields = options.fields || [];
        this.footer = options.footer || null;

        this.checkCompleteness();
    }

    checkCompleteness() {
        const missingFields = [];

        if (this.title && this.title.length <= 0) missingFields.push('title');
        if (this.description && this.description.length <= 0) missingFields.push('description');
        if (this.color && this.color.length <= 0) missingFields.push('color');

        if (missingFields.length > 0) {
            const errorMessage = `The embed is incomplete. The following fields are missing : ${missingFields.join(', ')}`;
            throw new Error(errorMessage);
        }
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    addField(name, value, inline = false) {
        this.fields.push({ name, value, inline });
        return this;
    }

    setFooter(text, iconURL = null) {
        this.footer = { text, iconURL };
        return this;
    }

    build() {
        const embed = new EmbedBuilder();

        if (this.title) embed.setTitle(this.title);
        if (this.description) embed.setDescription(this.description);
        if (this.color) embed.setColor(this.color);

        this.fields.forEach(field => {
            embed.addField(field.name, field.value, field.inline);
        });

        if (this.footer) {
            embed.setFooter(this.footer.text, this.footer.iconURL);
        }

        return embed;
    }
}

module.exports = { CreateEmbed };
