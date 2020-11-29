const Discord = require("discord.js");
const pagination = require("discord.js-pagination");
module.exports = {
  name: "shop",
  aliases: ["store"],
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    const Tools = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle(`${bot.user.username} Store`)
      .setDescription("🎣**Fishing Pole** ─ 100.000 coins ─ Tool\nUse this to go fishing!\n\n🏹**Bow** ─ 150.000 coins ─ Tool\nUse this to go hunting!")
      .setTimestamp();

    const Roles = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle(`${bot.user.username} Store`)
      .setDescription("🎭**Anonym Role** ─ 500.000 coins\n\n😷**Mask Role** ─ 1.000.000 coins")
      .setTimestamp();

    const pages = [Tools, Roles];
    
    const emojiList = ["⏪", "⏩"];
    
    pagination(message, pages, emojiList);
  }
};
