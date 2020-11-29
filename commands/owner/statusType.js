const db = require("quick.db");
const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
  name: "statustype",
  description: "Change the bot status",
  category: "🤴 | Owner",
  run: async (bot, message, args) => {
    if (message.author.id !== "435419273590996993")
      return message.channel.send("This command can only be used by owner");
    const { channel, author } = message;

    function ifInvalidStatusType(statusType) {
      const types = ["online", "invisible", "dnd", "idle"];

      if (types.includes(statusType)) {
        bot.user.setStatus(statusType);

        channel.send(
          `**${author.tag}** I changed my status to \`${statusType}\`!`
        );
        return;
      } else {
        channel.send(`**${author.tag}** invalid status type!`);
        return;
      }
    }
    if (!args[0]) {
      channel
        .send(
          new MessageEmbed()

            .setColor(message.guild.me.displayHexColor)
            .setDescription(
              "\n:green_circle:`online`\n\n👤`invisible`\n\n🔴`dnd`\n\n:waxing_crescent_moon:`idle`\n\n"
            )
            .setTimestamp()
        )
        .catch(err => console.error(err));
      return;
    }
    if (args[0]) {
      ifInvalidStatusType(args[0]);
      return;
    }
  }
};
