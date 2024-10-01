
class BotEvent {
    constructor({ name, once = false, execute }) {
        if (!name || typeof name !== 'string') {
            throw new Error('Each event must have a valid name of type string.');
        }
        if (!execute || typeof execute !== 'function') {
            throw new Error('Each event must have an execute function.');
        }

        this.name = name;
        this.once = once;
        this.execute = execute;
    }
}

module.exports = BotEvent;
