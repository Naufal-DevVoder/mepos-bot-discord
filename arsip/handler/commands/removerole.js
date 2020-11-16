module.exports.run = async (bot, message, args) => {
  let epicRole = message.guild.roles.cache.get("728521463346495520");
  const member = message.mentions.members.first();
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply("Missing Permission").then(m => m.delete(5000));
  }
  member.roles.remove(epicRole);
  message.channel.send("Role Removed");
};

module.exports.config = {
  name: "removerole",
  description: "",
  usage: "/removerole",
  accessableby: "Members",
  aliases: []
};
