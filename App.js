const { BotClient } = require("./src/ConstructorAction/BotClient");
const { BotEvent } = require("./src/ConstructorAction/BotEvent");
const { BotCommand } = require("./src/ConstructorAction/BotCommand");
const { CreateEmbed } = require("./src/ConstructorAction/CreateEmbed");

const { version } = require("./package.json")

module.exports = {
    BotClient,
    BotEvent,
    BotCommand,
    CreateEmbed,
    version
};