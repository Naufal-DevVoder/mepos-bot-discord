const Discord = require("discord.js");
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
  {
    const genius = require("genius-lyrics");
    const G = new genius.Client(process.env.GENIUS);

    G.tracks
      .search(
        message.content
          .split(" ")
          .slice(1)
          .join(" "),
        { limit: 1 }
      )
      .then(results => {
        const song = results[0];
        message.channel.send(
          `**${song.artist.name} - ${song.title}**\n<${song.url}>`
        ); //song.lyrics
      })
      .catch(err => message.reply(err));
  }
};
module.exports.config = {
  name: "lyrics",
  description: "Send lyrics link from Genius",
  usage: "/lyrics <Music title and singer>",
  accessableby: "Members",
  aliases: ["ly", "Ly", "lyrics", "lyric"]
};
