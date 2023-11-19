

class AntiSpam {
    constructor(options) {
        this.spam_threshold = options.spam_threshold;
        this.spam_interval = options.spam_interval;
        this.mute_role = options.mute_role ?? false;
    }
}