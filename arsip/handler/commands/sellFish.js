const Discord = require("discord.js")
const botconfig = require("../config.json");
const db = require("quick.db");
const fish = require('./inventory');
module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Missing Permission").then(m => m.delete(5000));
    }

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

        if(!user) return message.channel.send('Please specify a user, via mention or ID');
  
        if(user.id === message.author.id) return message.channel.send('You can\'t buy your own Fish');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(fish === null) return message.channel.send(`**${user.username} has no fish**`);


        db.delete(`fish_${message.guild.id}_${user.id}`);

        message.channel.send('Success!')
    }

module.exports.config = {
    name: "Buy Fish",
    description: "",
    usage: "/BuyFish",
    accessableby: "Members",
    aliases: ['buy', 'Buy',]
}