const db = require("quick.db");
const ms = require("parse-ms");
const Discord = require("discord.js");

module.exports = {
  name: "beg",
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    let user = message.author;

    let timeout = 1000;
    let amount = Math.floor(Math.random() * 300 + 1)

    let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);

    if (beg !== null && timeout - (Date.now() - beg) > 0) {
      let time = ms(timeout - (Date.now() - beg));

      let timeEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setFooter(`Lagi ngemis gan?`)
        .setDescription(
          `You've already begged recently\nBeg again in ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setFooter(`Lagi ngemis gan?`)
        .setDescription(`You've begged and received **${amount}** coins`);
      message.channel.send(moneyEmbed);
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`beg_${message.guild.id}_${user.id}`, Date.now());
    }
  }
};
