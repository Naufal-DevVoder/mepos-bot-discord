const Discord = require("discord.js");
const { Info } = require("userinfo-github");
const github = new Info();

module.exports = {
  name: "github",
  category: "🌏 | General",
  aliases: ["user-github", "info-github"],
  usage: "github <username>",
  description: "Get your IQ",
  run: async (bot, message, args) => {
    if(!args) return message.channel.send(`You must enter github username \nExample : ` + "/github Rejs23")
    github.getInfo(message, args);
  }
};
