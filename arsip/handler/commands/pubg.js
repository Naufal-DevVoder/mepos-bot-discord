const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
const {MessageEmbed} = require("discord.js");
            let member = message.mentions.members.first();

        if (!member)
            return message.channel.send(`You need to mention someone`)

        if (member.id === message.author.id)
            return message.channel.send(`You cant fight yourself`)


        var players = [message.author.username];
        var player = Math.floor(Math.random() * players.length);
        var guns = ["M4", "m24", "Akm,", "Awm", "Groza", "Desert Eagle", "Pistol", "AUG", "Shotguns", "Pump Shotguns", "Uzi"];

        var gun = Math.floor(Math.random() * guns.length);
        var shots = ["Headshot", "Bodyshot"];
        var shot = Math.floor(Math.random() * shots.length);

        if (!member) return message.channel.send("You need to mention someone")
        let embed = new MessageEmbed()
            .setTitle('Here Are the results')
            .setDescription(`${players[player]} has killed his opponent with ${guns[gun]} by ${shots[shot]}`)
            .setColor("RANDOM")
        return message.channel.send(embed)
    }


module.exports.config = {
    name: "pubg",
    description: "PUBG command",
    usage: "/pubg <mention user>",
    accessableby: "Members",
    aliases: ['Pubg', 'PUBG', 'pubg']
}