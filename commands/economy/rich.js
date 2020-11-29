const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "rich",
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    let money = db.startsWith(`money_${message.guild.id}`, { sort: ".data" });
    let content = "";

    for (let i = 0; i < money.length; i++) {
      let user = bot.users.get(money[i].ID.split("_")[2]).username;

      content += `${i + 1}. ${user} ~ ${money[i].data}\n`;
    }

    const embed = new Discord.MessageEmbed()
      .setDescription(
        `**${message.guild.name}'s Coin Leaderboard**\n\n${content}`
      )
      .setColor(message.guild.me.displayHexColor);

    message.channel.send(embed);
  }
};
