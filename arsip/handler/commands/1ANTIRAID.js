const Discord = require("discord.js")
const botconfig = require("../config.json");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
   if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Missing Permission").then(m => m.delete(5000));
    }
    const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send('locked all channels');
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }
                )
            })
            return message.channel.send('unlocked all channels')
        }
    }

module.exports.config = {
    name: "lock",
    description: "Lock all channels",
    usage: "/lock <on> to lock all channels \n/lock <off> to unlock all channels",
    accessableby: "Members",
    aliases: ['Lock', "raid", "Raid"]
}