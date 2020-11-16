const Discord = require("discord.js")
const botconfig = require("../config.json");
const db =require("quick.db")
const ms = require("parse-ms")

module.exports.run = async (bot, message, args) => {
 let amount = 1000
    let timeout = 86400000
    let user = message.mentions.users.first() || message.author
    let daily = await db.fetch(`daily_${message.author.id}`)
    
    if(daily !== null && timeout - (Date.now() - daily) >0) {
      
      let time = ms(timeout - (Date.now() - daily));
      
      let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Daily Command")
      .setDescription(`You Have Already Claimed Your Daily Rewards!\n\nWait: ${time.hours}.Hours ${time.minutes}.Minutes ${time.seconds}.Seconds`)
      .setFooter("Daily Command= Rewards Claimed!")
      
      
      message.channel.send(embed)
      
    } else {
      
      let embed  = new Discord.MessageEmbed()
      
      .setColor('RANDOM')
      .setTitle("Daily Command")
      .setDescription(`You Have Claimed ${amount} Credits! `)
      .setFooter("Daily Command = Claiming Rewards!")
      
      message.channel.send(embed)
  db.add(`credits_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())
      
      
    }
    
  }
module.exports.config = {
    name: "daily",
    description: "Send your request color or random color",
    usage: "/daily",
    accessableby: "Members",
    aliases: ['add', 'Add']
}