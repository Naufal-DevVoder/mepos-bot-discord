const db = require("quick.db");
const discord = require("discord.js");
const { getInfo } = require("../../handlers/xp.js");
module.exports = {
  name: "delxp",
  description: "delete user xp",
  category: "🔰 | leveling",
  run: (bot, message, args) => {
     if(message.author.id !== "435419273590996993") {
      return message.channel.send("This command can only be used by owner")
    }
    const user = message.mentions.users.first() || message.author;
    message.channel.send(`delete xp ${args}`)
    db.delete(`xp_${user.id}_${message.guild.id}`, args)

  }
}