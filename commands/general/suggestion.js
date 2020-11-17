const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "suggestion",
  category: "🌏 | General",
  aliases: ["suggest"],
  usage: "suggestion <text>",
  description: "send suggestion to developer about the bot",
  run: async (bot, message, args) => {
    if (!args.length) {
      return message.channel.send("Please Give the Suggestion");
    }

    const channelId = "777100531545931796";
    const channel = bot.channels.cache.get(channelId);

    let embed = new MessageEmbed()
      .setAuthor(
        "Suggestions from " + message.author.tag,
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      )
      .setColor("WHITE")
      .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true }))
      .addFields({
        name: `Information`,
        value: `\`\`\`Guild        :  ${message.guild.name}
Guild Owner  : ${message.guild.owner.user.tag}
User         : ${message.author.tag}
User Id      : ${message.author.id}\`\`\``,
        inline: true
      })
      .addField(`Suggestion Content`, `\`\`\`${args.join(" ")}\`\`\``, true)
      .setTimestamp();

    channel.send(embed);
    message.reply("Saran anda berhasil dikirim");
  }
};
