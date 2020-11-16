const Discord = require("discord.js")
const botconfig = require("../config.json");
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

        let fish = await db.get(`fish_${message.guild.id}_${user.id}`);

        let corrects = await db.get(`corrects_${message.guild.id}_${user.id}`);

        if(corrects === null) corrects = 0;
  if(fish === null) fish = 0;
  
   let embed = new Discord.MessageEmbed()
   .setColor("RANDOM")
   .setTitle(`${user.username}'s inventory`)
   .setDescription("Owned Items")
   .addFields({name : `💰 | Money`, value:`${corrects}`})
   .addFields({name : `🐟 | Fish`, value:`${fish}`});

        //message.channel.send(`${user.username}'s inventory /n **${fish}** fish and **${corrects}** bal`).then(i => i.delete({timeout: 10000}));
    message.channel.send(embed).then(i => i.delete({timeout: 10000}));
}

module.exports.config = {
    name: "inventory",
    description: "Check a users warnings",
    usage: "/inventory",
    accessableby: "Members",
    aliases: ['Inventory', 'Inv', 'inv']
}