const db = require("quick.db")
const discord = require("discord.js")

module.exports = {
  name: "status",
  description: "Change the bot status",
  usage: "status <here>",
  category: "🤴 | Owner",
  run: async (bot, message, args) => {
    
    if(message.author.id !== "435419273590996993") return message.channel.send("This command can only be used by owner")
    if(!args.length) {
      return message.channel.send("Mohon masukan status")
    }
    
 db.set(`status`, args.join(" "))
   await message.channel.send("Status bot sudah diperbarui")
    process.exit(1);
    
  
  }
}