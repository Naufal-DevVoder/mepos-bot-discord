const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "steal",
  aliases: ["rob"],
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    let user = message.mentions.members.first();
    let targetuser = await db.fetch(`money_${message.guild.id}_${user.id}`);
    let author = await db.fetch(`rob_${message.guild.id}_${user.id}`);
    let author2 = await db.fetch(`money_${message.guild.id}_${user.id}`);

    let timeout = 600000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      let timeEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(
          `You have already robbed someone\n\nTry again in ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(
          `You need atleast 1000 coins in your wallet to rob someone`
        );

      if (author2 < 1000) {
        return message.channel.send(moneyEmbed);
      }
      let moneyEmbed2 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(
          `${user.user.username} does not have anything you can rob`
        );
      if (targetuser < 0) {
        return message.channel.send(moneyEmbed2);
      }

      let vip = await db.fetch(`bronze_${user.id}`);
      let steal = Math.floor(Math.random() * 200) + 1
      if (vip === true) steal = Math.floor(Math.random() * 200) + 1;
      if (vip === null) steal = Math.floor(Math.random() * 1000) + 1;

      let embed = new Discord.MessageEmbed()
        .setDescription(
          `You robbed ${user} and got away with ${steal} coins`
        )
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);

      db.subtract(`money_${message.guild.id}_${user.id}`, steal);
      db.add(`money_${message.guild.id}_${user.id}`, steal);
      db.set(`rob_${message.guild.id}_${user.id}`, Date.now());
    }
  }
};
