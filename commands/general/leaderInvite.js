const Discord = require("discord.js");
const arraySort = require('array-sort');
module.exports = {
  name: "leaderinvite",
  category: "🌏 | General",
  aliases: ["leadinvite"],
  description: "Inviter Leaderboard",
  run: async (bot, message, args) => {
    let invites = await message.guild.fetchInvites().catch(error => { 
        return message.channel.send('Please enable permission `Manage server`');
    }) 

    invites = invites.array();

    arraySort(invites, 'uses', { reverse: true }); 

    let possibleinvites = [];
    let index = 0;
    invites.forEach(function(invites) {
        possibleinvites.push(`**${++index}**. 🔸 **${invites.inviter.tag}** 》 \`${invites.uses}\` **invites**`)
    })

    const embed = new Discord.MessageEmbed()
        .setTitle(`🏆 Invite Leaderboard 🏆`)
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${possibleinvites.join('\n')}`)
        .setTimestamp();
    message.channel.send(embed);
  }
};
