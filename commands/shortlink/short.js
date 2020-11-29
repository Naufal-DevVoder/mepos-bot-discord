const Discord = require("discord.js");
const shortio = require("short.io");
module.exports = {
  name: "short",
  category: "🔗 | Shortener",
  description: "Send your request color or random color",
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`Please provide link`);
    const short = new shortio(
      process.env.SHORTIOdomain,
      process.env.SHORTIOdomainid,
      process.env.SHORTIOapi
    );

    if (!args[1]) {
      short.createLink({ originalURL: `${args[0]}` }).then(link => {
        var qr_generator = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link.shortURL}`;
        const embed = new Discord.MessageEmbed()
          .setThumbnail(`${qr_generator}`)
          .setAuthor("RPLM -- Shorten")
          .setColor(message.guild.me.displayHexColor)
          .addField("URL ", args[0], true)
          .addField("Link ID ", link.id, true)
          .addField("ShortLink ", `${link.shortURL}`, true)
          .setFooter("Powered by short.io");
        console.log(link);
        message.channel.send({ embed });
      });
    } else {
      short
        .createLink({ originalURL: `${args[0]}`, path: `${args[1]}` })
        .then(link => {
          var qr_generator = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link.shortURL}`;
        const embed = new Discord.MessageEmbed()
          .setThumbnail(`${qr_generator}`)
          .setAuthor("RPLM -- Shorten")
          .setColor(message.guild.me.displayHexColor)
          .addField("URL ", args[0], true)
          .addField("Link ID ", link.id, true)
          .addField("Shortlink ", `${link.shortURL}`, true)
          .setFooter("Powered by short.io");
        console.log(link);
        message.channel.send({ embed });
        })
        .catch(err => {
          message.reply(err);
        });
    }
  }
};
