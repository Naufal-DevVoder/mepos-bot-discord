const Discord = require("discord.js")
const botconfig = require("../config.json");
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
  if (message.channel.id == "613979762527830028"){
    message.delete();
   return message.channel.send("You can't fish in general chat").then(i => i.delete({timeout: 3000}));
  }
  
  let user = (message.author)
  let fish = db.get(`warnings_${message.guild.id}_${user.id}`);
let amount = Math.floor(Math.random() * 10) + 1;
        

       // if(fish === null) {
        //    db.set(`fish_${message.guild.id}_${user.id}`, amount);
         // message.reply(`You cast out your line and brought back ${amount} Fish 🐟!`)
        //}

        //if(fish !== null){
            db.add(`fish_${message.guild.id}_${user.id}`, amount)
          message.reply(`You cast out your line and brought back ${amount} Fish 🐟!`)
   // }
 
}

module.exports.config = {
    name: "fish",
    description: "",
    usage: "/fish",
    accessableby: "Members",
    aliases: ['Fish']
}