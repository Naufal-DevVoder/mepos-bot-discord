const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "delemoji",
  usage: "delemoji <emoji name> \nExample : /delemoji :dorime:",
  category: "👮‍♂️ | Moderation",
  description: "Instant remove emoji",
  run: async (bot, message, args) => {
    if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
      return message.channel.send(
        new MessageEmbed().setDescription(
          `You don't have enough permissions to use this command!`
        )
      );
    }

    const emoji = args[0];
    if (!emoji)
      return message.channel.send(
        new MessageEmbed().setDescription(`Please provide an emoji to remove.\nExample : /delemoji :dorime:`)
      );

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.resolve(customemoji.id).delete();

      if (!message.guild.emojis.resolve(customemoji.id))
        return message.channel.send(`That emoji doesn't exist in this server.`);

      const Added = new MessageEmbed().setDescription(
        `Emoji has been removed.`
      );
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(
          new MessageEmbed().setDescription(`Please give me a valid emoji!\nExample : /delemoji :dorime:`)
        );
      message.channel.send(
        new MessageEmbed().setDescription(
          `You can use normal emoji's everywhere so you don't need to remove that.`
        )
      );
    }
  }
};
