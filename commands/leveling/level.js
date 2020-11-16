const db = require("quick.db");
const discord = require("discord.js");
const { getInfo } = require("../../handlers/xp.js");
module.exports = {
  name: "level",
  description: "Get the level of author or mentioned",
  usage: "level [user]",
  aliases: ["rank"],
  category: "🔰 | leveling",
  run: (bot, message, args) => {
    const search = " ";
    const replaceWith = "%20";
    const user = message.mentions.users.first() || message.author;

    if (user.id === bot.user.id) {
      //IF BOT
      return message.channel.send("🤖 I am on level 100");
    }

    if (user.bot) {
      return message.channel.send("Bot do not have levels");
    }

    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;

    let { level, remxp, levelxp } = getInfo(xp);
    if (xp === 0) {
      (level = 0), (remxp = 0), (levelxp = 100);
    }

    let av = user.displayAvatarURL({ format: "png" });
    let img = `https://api.no-api-key.com/api/v2/rank?user_image=${av}&text_heading=hey%20there%20lol&username=${user.username
      .split(search)
      .join(
        replaceWith
      )}&level=${level}&rank=-&total_xp=${levelxp}&current_xp=${remxp}&usertag=${
      user.discriminator
    }&primary=%23FFFF&secondary=%235DADE2`;

    let embed = new discord.MessageEmbed()
      .setAuthor(user.username, message.guild.iconURL())
      .setColor("#ff2050")
      .setThumbnail(user.avatarURL()).setDescription(`**LEVEL** - ${level}
**XP** - ${remxp}/${levelxp}`);

    message.channel.send(img);
  }
};
