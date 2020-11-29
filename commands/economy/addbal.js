const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "addbal",
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    if (message.author.id !== "435419273590996993")
      return message.channel.send(
        `${message.author}, This command for owner only`
      );
    let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.add(`money_${message.guild.id}_${user.id}`, args[1]);
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);

    let moneyEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`Added ${args[1]} coins\n\nNew Balance: ${bal}`);
    message.channel.send(moneyEmbed).then(i => i.delete({ timeout: 5000 }));
    message.delete();
  }
};
