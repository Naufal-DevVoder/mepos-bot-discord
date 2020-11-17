const Discord = require("discord.js");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "user-info",
  category: "🌏 | General",
  aliases: ["whois", "user"],
  usage: "user-info <mention user>",
  description: "Get user profile",
  run: async (bot, message, args) => {
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(userArgs[0]) ||
      message.guild.members.cache.find(
        x =>
          x.user.username.toLowerCase() === userArgs.slice(0).join(" ") ||
          x.user.username === userArgs[0]
      ) ||
      message.member;
    
    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      Idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    };

    //============================BADGES================================
    let badges = await user.user.flags;
    badges = await badges.toArray();

    let newbadges = [];
    badges.forEach(m => {
      newbadges.push(m.replace("_", " "));
    });

    let embed = new MessageEmbed().setThumbnail(
      user.user.displayAvatarURL({ dynamic: true })
    );

    //==============================ACTIVITY=========================
    let array = [];
    if (user.user.presence.activities.length) {
      let data = user.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "None";
        let xname = data[i].details || "None";
        let zname = data[i].state || "None";
        let type = data[i].type;

        array.push(`❯ **${type}** \n \`${name} : ${xname} : ${zname}\``);

        if (data[i].name === "Spotify") {
          embed.setThumbnail(
            `https://i.scdn.co/image/${data[i].assets.largeImage.replace(
              "spotify:",
              ""
            )}`
          );
        }

        embed.setDescription(array.join("\n"));
      }
    }

    //============================WARNA EMBED===================================
    embed.setColor(
      user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor
    );

    embed.setAuthor(
      user.user.tag,
      user.user.displayAvatarURL({ dynamic: true })
    );

    //=========================USER NICK NAME==============================
    if (user.nickname !== null) embed.addField("❯ Nickname", user.nickname);
    embed
      .addField(
        "❯ Joined At",
        moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY, HH:mm")
      )
      .addField(
        "❯ Account Created At",
        moment(user.user.createdAt).format("LLLL")
      )
      .addField(
        "❯ Common Information",
        `ID: \`${user.user.id}\`\nDiscriminator: ${user.user.discriminator}\nBot: ${user.user.bot}\nDeleted User: ${user.deleted}`
      )
      .addField("❯ Badges", newbadges.join(", ").toLowerCase() || "None")
      .setFooter(user.user.presence.status, stat[user.user.presence.status]);
    embed
      .addField("❯ Roles", `<@&${user._roles.join("> <@&")}>`)
    embed.setTimestamp();

    return message.channel.send(embed).catch(err => {
      return message.channel.send("Error : " + err);
    });
  }
};
