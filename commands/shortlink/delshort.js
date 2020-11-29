const Discord = require("discord.js");
const shortio = require("short.io");
module.exports = {
  name: "shortdel",
  category: "🔗 | Shortener",
  description: "Send your request color or random color",
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`Please provide link id`);
    const short = new shortio(
      process.env.SHORTIOdomain,
      process.env.SHORTIOdomainid,
      process.env.SHORTIOapi
    );
      short.deleteLink(args[0])
    .then(result => {
        const embed = new Discord.MessageEmbed()
          .setDescription("Shortlink was deleted")
          .setColor("RED")
        message.channel.send({ embed });
      })
    .catch(e => console.log(e));
    }
  }