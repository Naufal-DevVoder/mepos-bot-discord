const discord = require("discord.js")

module.exports = {
  name: "restart",
  description: "Restart the bot",
  aliases: ["refresh"],
  category: "🤴 | Owner",
  run: async (bot, message, args) => {
  
    if(message.author.id !== "435419273590996993") {
    return message.channel.send("Perintah ini hanya bisa diakses oleh developer")
    }
   await message.channel.send("Bot sudah direstart oleh " + message.author.username).then(i => i.delete({ timeout: 5000 }));
    process.exit(1);
    
  }
}