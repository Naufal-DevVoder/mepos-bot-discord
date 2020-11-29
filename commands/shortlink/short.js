const Discord = require("discord.js");
const shortio = require("short.io");
module.exports = {
  name: "short",
  category: "🔗 | Shortener",
  description: "Send your request color or random color",
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`Please provide link`);
    const short = new shortio(process.env.SHORTIOdomain, process.env.SHORTIOdomainid, process.env.SHORTIOapi);

    if (!args[1]) {
      short.createLink({ originalURL: `${args[0]}` }).then(link => {
        //message.channel.send(link.shortURL);
        const embed = new Discord.MessageEmbed()
          .setAuthor("RPLM -- Shorten")
         .setColor(message.guild.me.displayHexColor)
          .addField("URL:", args[0], true)
          .addField("Short Link:", `${link.shortURL}`, true)
          .setFooter("Powered by short.io");
        message.channel.send({ embed });
      });
    } else {
      short
        .createLink({ originalURL: `${args[0]}`, path: `${args[1]}` })
        .then(link => {
          //message.channel.send(link.shortURL);
          const embed = new Discord.MessageEmbed()
            .setAuthor("RPLM -- Shorten")
          .setColor(message.guild.me.displayHexColor)
            .addField("URL:", args[0], true)
            .addField("Short Link:", `${link.shortURL}`, true)
            .setFooter("Powered by short.io");
          message.channel.send({ embed });
        }).catch(err => {
        message.reply(err);
      })
    }
  }
};
