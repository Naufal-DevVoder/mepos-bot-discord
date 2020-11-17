const Discord = require("discord.js");
const Random = require("srod-v2");


module.exports = {
  name: "hastebin",
  category: "🛠 | Utility",

  description: "Create hastebin",
  run: async (bot, message, args) => {
    let Hastebin = await Random.Hastebin(args.join(" "), "RANDOM");
  message.channel.send(Hastebin);
    message.delete();
  }
  // message.channel.send("🏓 Pong! `" + bot.ws.ping + "ms`");
  //message.delete({ timeout: 4000 }); //angkanya bebas
};
