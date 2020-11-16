const Discord = require("discord.js");
const botconfig = require("../config.json");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
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
  if (member.presence.status === "dnd")
    member.presence.status = "Do Not Disturb";
  if (member.presence.status === "online") member.presence.status = "Online";
  if (member.presence.status === "idle") member.presence.status = "Idle";
  if (member.presence.status === "offline") member.presence.status = "offline";

  let x = Date.now() - member.createdAt;
  let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
  const joined = Math.floor(y / 86400000);

  const joineddate = moment
    .utc(member.joinedAt)
    .format("dddd, MMMM Do YYYY, HH:mm:ss");
  let status = member.presence.status;

  const userEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(
      member.user.tag,
      member.user.displayAvatarURL({ format: "png", dynamic: true })
    )
    .setThumbnail(
      member.user.displayAvatarURL({ format: "png", dynamic: true })
    )
    .addField("❯ Bot", member.user.bot ? "True" : "False", true)
    .addField("❯ Status", "```" + status + "```", true)
  .addField(
      "❯ Register",
      "```" +
        `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}` +
        "```",
      true
    )
    .addField(
      "❯ Join",
      "```" + `${joineddate} \n❯ ${joined} days Ago` + "```"
    )
    
    .addField("❯ Roles",`<@&${member._roles.join("> <@&")}>`)
    .setTimestamp()
    .setFooter("Id : " + member.user.id);
  message.channel.send(userEmbed);
  message.delete({ timeout: 4000 }); //angkanya bebas
};

module.exports.config = {
  name: "user info",
  description: "",
  usage: "/user-info",
  accessableby: "Members",
  aliases: ["user-info", "user", "whois"]
};
