const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setleave",
  category: "👮‍♂️ | Moderation",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: (bot, message, args) => {
    
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Missing Permission").then(m => m.delete(5000));
    }

    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Mohon mention channels yang akan dipakai")
    }
    
    db.set(`leavechannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Leave Channel is seted as ${channel}`)
  }
}