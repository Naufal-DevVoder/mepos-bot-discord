const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "pay",
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    let user = message.mentions.members.first();

    let member = db.fetch(`money_${message.guild.id}_${message.author.id}`);

    let embed1 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`Mention someone to pay`);

    if (!user) {
      return message.channel.send(embed1);
    }
    let embed2 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`Specify an amount to pay`);

    if (!args[1]) {
      return message.channel.send(embed2);
    }
    let embed3 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`You can't pay someone negative money`);

    if (message.content.includes("-")) {
      return message.channel.send(embed3);
    }
    let embed4 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`You don't have that much money`);

    if (member < args[1]) {
      return message.channel.send(embed4);
    }

    let embed5 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`You have payed ${user.user.username} ${args[1]} coins`);

    message.channel.send(embed5);
    db.add(`money_${message.guild.id}_${user.id}`, args[1]);
    db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1]);
  }
};
