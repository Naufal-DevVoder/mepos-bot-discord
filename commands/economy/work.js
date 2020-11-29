const db = require("quick.db");
const ms = require("parse-ms");

const Discord = require("discord.js");

module.exports = {
  name: "work",
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`);

    let timeout = 60000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      let timeEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(
          `You have already worked recently\nTry again in ${time.minutes}m ${time.seconds}s `
        )
        .setTimestamp();
      message.channel.send(timeEmbed);
    } else {
      let replies = [
        "Programmer",
        "Hacker",
        "Developer",
        "Gamer",
        "Youtuber",
        "Streamer"
      ];

      let result = Math.floor(Math.random() * replies.length);
      let amount = Math.floor(Math.random() * 1000) + 50;
      let embed1 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(
          `You worked as a ${replies[result]} and earned ${amount} bal`
        )
        .setTimestamp();
      message.channel.send(embed1);

      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`work_${message.guild.id}_${user.id}`, Date.now());
    }
  }
};
