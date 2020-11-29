const Discord = require("discord.js");
const request = require("node-superfetch");

module.exports = {
  name: "google",
  category: "🛠 | Utility",
  usage: "google <query>",
  description: "Check bot ping",
  run: async (bot, message, args) => {
    let googleKey = process.env.GOOGLE;

    let csx = process.env.CSX;

    let query = args.join(" ");

    let result;

    if (!query) return message.channel.send("Please enter the query.");

    let href = await search(query);

    if (!href) return message.channel.send("Unknown search.");

    const embed = new Discord.MessageEmbed()

      .setTitle(href.title)

      .setDescription(href.snippet)

      .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null) // Sometimes, the thumbnail might be unavailable in variant site. Return it to null.

      .setURL(href.link)

      .setColor(message.guild.me.displayHexColor)

      .setFooter("Powered by Google");

    return message.channel.send(embed);

    async function search(query) {
      const { body } = await request
        .get("https://www.googleapis.com/customsearch/v1")
        .query({
          key: googleKey,
          cx: csx,
          safe: "off",
          q: query
        });

      if (!body.items) return null;

      return body.items[0];
    }
  }
};
