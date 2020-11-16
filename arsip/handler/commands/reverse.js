const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if (args.length < 1) {
        throw 'You must input text to be reversed!';
    }
    message.reply(args.join(' ').split('').reverse().join(''));


}

module.exports.config = {
    name: "reverse",
    description: "",
    usage: "/reverse",
    accessableby: "Members",
    aliases: ['Reverse', 'reverse']
}