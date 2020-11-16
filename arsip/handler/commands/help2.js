const Discord = require("discord.js")
const botconfig = require("../config.json")
const pagination = require('discord.js-pagination');

module.exports.run = async (bot, message, args) => {
  
    const moderation = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username} Command List`)
        .setColor('RANDOM')
        .setTitle('Moderation')
        .addField('`/announce`', 'Send announncement embed message')
        .addField('`/poll`', 'Send polling embed message')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username} Command List`)
        .setColor('RANDOM')
        .setTitle('Fun')
        .addField('`/advice`', 'Send fresh advice')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username} Command List`)
        .setColor('RANDOM')
        .setTitle('Utlity')
        .addField('`/8ball {Question}`', 'Send 8ball command')
        .setTimestamp()
        
        const images = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username} Command List`)
        .setColor('RANDOM')
        .setTitle('Actions')
        .addField('`/cry`', 'Send random anime cry image')
        
        .setTimestamp()

        const pages = [
                moderation,
                fun,
                utility,
                images
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '60000';

        pagination(message, pages, emojiList, timeout)
    }

module.exports.config = {
    name: "help",
    description: "",
    usage: "/help",
    accessableby: "Members",
    aliases: ['Help']
}