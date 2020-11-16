const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const { getInfo } = require("../../handlers/xp.js");
module.exports = {
  name: "leaderboard",
  description: "Display a leveling leaderboard",
  aliases: ["lb", "top"],
  usage: "leaderboard <page>",
  category: "🔰 | leveling",
  run: async (bot, message, args) => {
    if (message.author.id !== "435419273590996993") {
      return message.channel.send(
        "This command can only be used by owner, because this command is not finished"
      );
    }

    let data = bot.db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
    if (data.length < 1) return message.channel.send("No leaderboard");
    let myrank = data.map(m => m.ID).indexOf(`xp_${message.author.id}`) + 1 || "N/A";
    data.length = 20;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[1];
        let user = await bot.users.fetch(id);
        user = user ? user.tag : "Unknown User#0000";
        let rank = data.indexOf(data[i]) + 1;
      let [level, remxp] = Util.getLevel(exp, true);
        let levelxp = Util.getLevelxp(level);
        //let level = bot.db.get(`level_${id}`);
        let xp = data[i].data;
        let xpreq = Math.floor(Math.pow(level / 0.1, 2));
        lb.push({
            user: { id, tag: user },
            rank,
            level,
            xp,
            xpreq
        });
    };

    const embed = new MessageEmbed()
    .setTitle("Leaderboard")
    .setColor("RANDOM")
    lb.forEach(d => {
        embed.addField(`${d.rank}. ${d.user.tag}, ${d.xp}exp level ${d.level}`);
    });
    embed.setFooter(`Your Position: ${myrank}`);
    return message.channel.send(embed);
  },
};