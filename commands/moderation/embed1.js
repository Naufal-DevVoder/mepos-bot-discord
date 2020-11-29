const Discord = require("discord.js")

module.exports = {
  name: "embed1",
  aliases: ["embed-1","e1", "e-1"],
  category: "👮‍♂️ | Moderation",
  description: "Say embed message",
run: async (bot, message, args) => { 
  
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Missing Permission").then(m => m.delete(5000));}
    let text = args.join(" ");
    if (!text) return message.reply("Please give me some text to say! :)");
    const sayEmbed = new Discord.MessageEmbed()
    .setDescription(text)
    .setFooter(`Message by ${message.author.username}`)
  .setColor(message.guild.me.displayHexColor)
    .setTimestamp();
    message.delete();
    message.channel.send(sayEmbed);
  }
}