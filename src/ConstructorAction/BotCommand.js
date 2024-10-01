
class BotCommand {
    constructor({ name, description, options = [], execute }) {
        if (!name || typeof name !== 'string') {
            throw new Error('Each command must have a valid name of type string.');
        }
        if (!description || typeof description !== 'string') {
            throw new Error('Each command must have a valid description of type string.');
        }
        if (!execute || typeof execute !== 'function') {
            throw new Error('Each command must have an execute function.');
        }

        this.name = name;
        this.description = description;
        this.options = options; // Options like choices for slash commands
        this.execute = execute;
    }
}

module.exports = BotCommand;
