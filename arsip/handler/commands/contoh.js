const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
    return message.channel.send("contoh")
}

module.exports.config = {
    name: "contoh",
    description: "",
    usage: "/cont",
    accessableby: "Members",
    aliases: ['c']
}