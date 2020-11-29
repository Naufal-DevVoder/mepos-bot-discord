const Discord = require("discord.js")

module.exports = {
  name: "embed2",
  aliases: ["embed-2","e2", "e-2"],
  category: "👮‍♂️ | Moderation",
  description: "Say embed message",
run: async (bot, message, args) => { 
  
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Missing Permission").then(m => m.delete(5000));}
     let titleEmbed = args[0];
    let textEmbed = args.slice(1).join(" ");
    if (!textEmbed) return message.reply("Please give me some text to say! :)");
    const sayEmbed = new Discord.MessageEmbed()
    .setTitle(titleEmbed)
    .setDescription(textEmbed)
    .setFooter(`Message by ${message.author.username}`)
   .setColor(message.guild.me.displayHexColor)
    .setTimestamp();
    message.delete();
    message.channel.send(sayEmbed);
  }
}