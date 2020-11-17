const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "report",
  category: "🌏 | General",
  aliases: ["reports"],
  usage: "report <text>",
  description: "send report to developer about the bot",
  run: async (bot, message, args) => {
    if (!args.length) {
      return message.channel.send("Please Give the text report");
    }

    const channelId = "777100593961238528";
    const channel = bot.channels.cache.get(channelId);

    let embed = new MessageEmbed()
      .setAuthor(
        "Reports from " + message.author.tag,
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      )
      .setColor("BLACK")
      .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true }))
      .addFields({
        name: `Information`,
        value: `\`\`\`Guild        :  ${message.guild.name}
Guild Owner  : ${message.guild.owner.user.tag}
User         : ${message.author.tag}
User Id      : ${message.author.id}\`\`\``,
        inline: true
      })
      .addField(`Report Content`, `\`\`\`${args.join(" ")}\`\`\``, true)
      .setTimestamp();

    channel.send(embed);
    message.reply("Laporan anda berhasil dikirim");
  }
};
