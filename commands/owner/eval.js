const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  aliases: ["ev"],
  category: "🤴 | Owner",
  run: async (bot, message, args) => {
    if (message.author.id !== "435419273590996993") return;
    try {
      let codein = args.join(" ");
      let code = eval(codein);

      if (typeof code !== "string")
        code = require("util").inspect(code, { depth: 0 });
      const embed = new MessageEmbed()
        .setAuthor("Eval")
        .setColor(message.guild.me.displayHexColor)
        .addField(":inbox_tray: Input", `\`\`\`js\n${codein}\`\`\``)
        .addField(":outbox_tray: Output", `\`\`\`js\n${code}\n\`\`\``);
      message.channel.send(embed);
    } catch (e) {
      message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
  }
};
