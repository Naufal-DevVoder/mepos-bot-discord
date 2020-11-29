const Discord = require("discord.js")

module.exports = {
  name: "embed",
  aliases: ["embed","e",],
  category: "👮‍♂️ | Moderation",
  description: "Say embed message",
run: async (bot, message, args) => { 
  
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Missing Permission").then(m => m.delete(5000));}
    let text = args.join(" ");
    if (!text) return message.reply("Please give me some text to say! :)");
    const sayEmbed = new Discord.MessageEmbed()
    .setDescription(text)
    .setColor(message.guild.me.displayHexColor)
    message.delete();
    message.channel.send(sayEmbed);
  }
}