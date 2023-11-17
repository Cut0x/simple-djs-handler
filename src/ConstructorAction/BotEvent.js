class BotEvent {
    constructor(options) {
        this.name = options.name;
        this.once = options.once || false;
        this.execute = options.execute;
    }
}

module.exports = { BotEvent };