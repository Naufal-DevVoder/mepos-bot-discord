const Discord = require("discord.js");
const shortio = require("short.io");
module.exports = {
  name: "shortlist",
  category: "🔗 | Shortener",
  description: "Send your request color or random color",
  run: async (bot, message, args) => {
    if (message.author.id !== "435419273590996993")
      return message.channel.send("This command can only be used by owner");

    const short = new shortio(
      process.env.SHORTIOdomain,
      process.env.SHORTIOdomainid,
      process.env.SHORTIOapi
    );
    short.getLinks().then(links => {
      console.log(links);
    });
  }
};
