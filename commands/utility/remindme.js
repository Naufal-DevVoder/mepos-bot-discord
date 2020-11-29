const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "timer",
  category: "🛠 | Utility",
  usage: "timer <time>",
  description: "Sets a timer",
  run: async (bot, message, args, msg) => {
    let Timer = args[0];

    if (!args[0]) {
      return message.channel.send(
        "Please enter a period of time, with either `s, m or h` at the end!"
      );
    }

    if (args[0] <= 0) {
      return message.channel.send(
        "Please enter a period of time, with either `s, m or h` at the end!"
      );
    }
    let embed = new Discord.MessageEmbed()
      .setDescription(
        "<:ready:778429233731076136> Timer has been set " +
          `${ms(ms(Timer), { long: true })}`
      )
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);

    setTimeout(function() {
      message.channel.send(
        `Timer has ended after ${ms(ms(Timer), { long: true })}` +
          message.author.toString()
      );
    }, ms(Timer));
  }
};
