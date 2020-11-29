const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "daily",
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    let user = message.author;

    let timeout = 86400000;
    let amount = 5000;

    let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      let timeEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(
          `You've already collected your daily reward\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(
          `You've collected your daily reward of ${amount} coins`
        );
      message.channel.send(moneyEmbed);
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`daily_${message.guild.id}_${user.id}`, Date.now());
    }
  }
};
