const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  category: "🌏 | General",
  usage: "avatar <mention user>",
  aliases: ["av"],
  description: "Show user avatar",
  run: async (bot, message, args) => {
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(userArgs[0]) ||
      message.guild.members.cache.find(
        x =>
          x.user.username.toLowerCase() === userArgs.slice(0).join(" ") ||
          x.user.username === userArgs[0]
      ) ||
      message.member;

    let png = member.user.displayAvatarURL({
      format: "png",
      dynamic: true
    });
    let jpg = member.user.displayAvatarURL({
      format: "jpg",
      dynamic: true
    });
    let gif = member.user.displayAvatarURL({
      format: "gif",
      dynamic: true
    });
    let jpeg = member.user.displayAvatarURL({
      format: "jpeg",
      dynamic: true
    });
    let webp = member.user.displayAvatarURL({
      format: "webp",
      dynamic: true
    });
    
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Avatar")
      .setFooter(`Thanks for using ${bot.user.username}`)
      .setAuthor(
        member.user.tag,
        member.user.displayAvatarURL({ format: "png", dynamic: true })
      )
      .setDescription(
        `[PNG](${png}) | [JPG](${jpg}) | [GIF](${gif}) | [JPEG](${jpeg}) | [WEBP](${webp})`
      )
      .setImage(member.user.displayAvatarURL({size: 256, dynamic: true}));
    message.channel.send(avatarEmbed);
    message.delete({ timeout: 4000 }); //angkanya bebas
  }
};
