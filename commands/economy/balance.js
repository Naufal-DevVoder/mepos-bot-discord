const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "balance",
  aliases: ["bal"],
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    let guild = message.guild.name;

    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(userArgs[0]) ||
      message.guild.members.cache.find(
        x =>
          x.user.username.toLowerCase() === userArgs.slice(0).join(" ") ||
          x.user.username === userArgs[0]
      ) ||
      message.member;

    let bal = db.fetch(`money_${message.guild.id}_${user.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);
    if (bank === null) bank = 0;

    let moneyEmbed = new Discord.MessageEmbed()
      .setTitle(`${user.user.username}'s balance`)
      .setColor(message.guild.me.displayHexColor)
      .setFooter(`${guild}`)
      .setTimestamp()
      .setDescription(`**Cash:** ${bal}\n**Bank:** ${bank}`);
    message.channel.send(moneyEmbed);
  }
};
