const Discord = require("discord.js");
const quiz = [
  { q: "Who is Metclocker", a: ["suryo", "Suryo"] },
  { q: "Who is Ryan dmasiv", a: ["rakean", "Rakean"] },
  { q: "Who is Saekyo", a: ["Reski"] }
];
const options = {
  max: 1,
  time: 10050,
  errors: ["time"]
};

module.exports = {
  name: "quiz",
  category: "🛠 | Utility",
  description: "Quiz commands",
  run: async (bot, message, args) => {
    const item = quiz[Math.floor(Math.random() * quiz.length)];
    await message.channel.send(item.q);
    try {
      const collected = await message.channel.awaitMessages(
        answer => item.a.includes(answer.content.toLowerCase()),
        options
      );
      const winnerMessage = collected.first();

      return message.channel.send({
        embed: new Discord.MessageEmbed()
          .setAuthor(
            `Winner: ${winnerMessage.author.tag}`,
            winnerMessage.author.displayAvatarURL
          )
          .setTitle(`Correct Answer: \`${winnerMessage.content}\``)
          .setFooter(`Question: ${item.q}`)
          .setColor(message.guild.me.displayHexColor)
      });
    } catch (_) {
      return message.channel.send({
        embed: new Discord.MessageEmbed()
          .setAuthor("No one got the answer in time!")
          .setTitle(`Correct Answer(s): \`${item.a}\``)
          .setFooter(`Question: ${item.q}`)
          .setColor(message.guild.me.displayHexColor)
      });
    }
  }
};
