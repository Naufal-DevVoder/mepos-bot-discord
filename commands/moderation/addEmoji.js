const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "addemoji",
  usage: "addemoji <emoji id> <emoji name> \nExample : /addemoji :AK_dorime:703078287882059927 dorime",
  category: "👮‍♂️ | Moderation",
  description: "Instant steal emoji",
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
        new MessageEmbed().setDescription("Please provide an emoji. \nExample : /addemoji :AK_dorime:703078287882059927 dorime")
      );

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      const Added = new MessageEmbed().setDescription(`Emoji added.`);
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(
          new MessageEmbed().setDescription("Please provide a valid emoji. \nExample : /addemoji :AK_dorime:703078287882059927 dorime")
        );
      message.channel.send(
        new MessageEmbed().setDescription(
          "You can use normal emojis without adding it to a server."
        )
      );
    }
  }
};
