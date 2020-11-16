const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first();
    if (!user) {
      return message.channel.send("Please include who you are killing.");
    }
    message.delete();
    return message.channel.send(
      message.author.username + " Killed " + user.username
    );
  }

module.exports.config = {
    name: "kill",
    description: "",
    usage: "/kill",
    accessableby: "Members",
    aliases: ['k']
}