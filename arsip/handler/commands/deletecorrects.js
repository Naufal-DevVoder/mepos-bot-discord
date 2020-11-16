const Discord = require("discord.js")
const botconfig = require("../config.json");
const db = require("quick.db");
const corrects = require('./inventory');
module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Missing Permission").then(m => m.delete(5000));
    }

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

        if(!user) return message.channel.send('Please specify a user, via mention or ID');
  
        if(user.id === message.author.id) return message.channel.send('You can\'t clear your own bal');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(corrects === null) return message.channel.send(`**${user.username} has no bal**`);


        db.delete(`corrects_${message.guild.id}_${user.id}`);

        message.channel.send('Success!')
    }

module.exports.config = {
    name: "Trade",
    description: "",
    usage: "/Trade",
    accessableby: "Members",
    aliases: ['trade']
}