const Discord = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: "buy",
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    let user = message.author;

    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

    let Embed = new Discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setDescription(`You need 10000 coins to Fishing Pole`);
     if (args[0] == 'pole') {
       
        if (author < 100000) return message.channel.send(Embed)
        
        db.fetch(`pole_${message.guild.id}_${user.id}`);
        db.add(`pole_${message.guild.id}_${user.id}`, 1)

        let Embed2 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Purchased Fishing Pole For 100000 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 100000)
        message.channel.send(Embed2)
    } else if(args[0] == 'bow') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`You need 150000 coins to purchase some Bow`);

        if (author < 150000) return message.channel.send(Embed2)
       
        db.fetch(`bow_${message.guild.id}_${user.id}`)
        db.add(`bow_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Purchased Fresh Bow For 150000 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 150000)
        message.channel.send(Embed3)
    } else if (args[0] == 'anonym') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`You need 500000 coins to purchase a anonym role`);

        if (author < 500000) return message.channel.send(Embed2)
       
        db.fetch(`anonym_${message.guild.id}_${user.id}`)
        db.set(`anonym_${message.guild.id}_${user.id}`, true)

        let Embed3 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Purchased a Anonym Role For 500000 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 500000)
        await message.member.roles.add("782626442444931073");
        message.channel.send(Embed3)
    } else if (args[0] == 'mask') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`You need 1000000 coins to purchase a mask role`);

        if (author < 1000000) return message.channel.send(Embed2)
       
        db.fetch(`mask_${message.guild.id}_${user.id}`)
        db.set(`mask_${message.guild.id}_${user.id}`, true)

        let Embed3 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Purchased a Mask Role For 1000000 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 1000000)
        await message.member.roles.add("782626516906672131");
        message.channel.send(Embed3)
    }
    else {
        let embed3 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription('Enter an item to buy')
        message.channel.send(embed3)
    }
    
  }
}