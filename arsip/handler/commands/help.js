const Discord = require("discord.js")
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = db.get(`prefix_${message.guild.id}`)
  //return message.channel.send("Help command sedang dalam perbaikan");
  //We have to set a argument for the help command beacuse its going to have a seperate argument.
  let helpArray = message.content.split(" ");
  let helpArgs = helpArray.slice(1);

  //Custom Help command by using the second argument.
  if (helpArgs[0] === "gaming") {
    return message.reply("This is a Gaming information Command.");
  }

  //Normal usage of (prefix)help without any args. (Shows all of the commands and you should set the commands yourself)
  if (!helpArgs[0]) {
    let embed = new Discord.MessageEmbed()
      .setAuthor(`${bot.user.username}`, `${bot.user.displayAvatarURL({ format: "png", dynamic: true })}`)
      .setThumbnail(
        "https://media.discordapp.net/attachments/739051913651159071/750731196090155099/5a61f2d756104_thumb900-removebg-preview.png?width=391&height=391"
      )
          .setTitle("Invite")
      .setURL("https://kaguya-website.glitch.me/index.html")
      .setFooter(
        `Don't include <> or [], it's mean <> is required and [] is optional`,
        "https://media.discordapp.net/attachments/739051913651159071/750732937166848080/12-125584_computer-icons-information-angle-logo-brand-nfl-atlanta-removebg-preview_1.png?width=374&height=391"
      )
    
    .setDescription("Global prefix is `/`" + `\nServer prefix is ${prefix || "None"} `)
    .addFields({name : "Support Server", value: "`Coming Soon`", inline : true})
    .addFields({name : "Help Command Usage", value: "`help [name command or module]`", inline : true})
      .addFields({
        name: "🎭 | Actions",
        value:
          "`cry`, `dance`, `drink`, `eat`, `hand`, `hug`, `kill`, `kiss`, `lick`, `pat`, `sing`, `slap`, `smile`, `smug`",
        inline: true
      })
      .addFields({ name: "😄 | Fun", value: "`8ball`, `advice`, `ascii`, `coinflip`, `emoji`, `iq`, `joke`, `meme`, `minesweeper`, `minesweeperV2`, `pubg`, `rps`, `ship`, `simp`, `trivia`, `tsundere`", inline: true })
      .addFields({ name: "🌏 | General", value: "`avatar`, `bot`, `help`, `ping`, `respect`, `suggestion`, `uptime`, `user`", inline: true })
      .addFields({
        name: "🖼 | Image Manipulation",
        value: "`beautiful`, `dark`, `gay`, `hitler`, `jail`, `shit`, `shoot`, `smart`, `spank`, `trash`, `triggered`, `trump`, `wanted`",
        inline: true
      })
    .addFields({
        name: "👮‍♂️ | Moderation",
        value: "`announce`, `clear`, `prefix`, `lock on`, `lock off`, `poll`, `say`",
        inline: true
      })
      .addFields({
        name: "🛠 | Utility",
        value: "`anime`, `date`, `lyrics`, `math`, `spotify`, `weather`, `wiki`",
        inline: true
      })
    

      .setColor("RANDOM");

    message.channel.send(embed);
  }

  //Reads the moudle.exports.config (This line of code is on commands folder, each command will read automaticly) by the second argument (the command name) and shows the information of it.
  if (helpArgs[0]) {
    let command = helpArgs[0];

    if (bot.commands.has(command)) {
      command = bot.commands.get(command);
      let embed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username} help`, `${bot.user.displayAvatarURL({ format: "png", dynamic: true })}`)
      .setTitle("Invite")
      .setURL("https://kaguya-website.glitch.me/index.html")
      .setThumbnail(
        "https://media.discordapp.net/attachments/739051913651159071/750731196090155099/5a61f2d756104_thumb900-removebg-preview.png?width=391&height=391"
      )
      .setDescription("Global prefix is `/`" + `\nServer prefix is ${prefix || "None"} `)
    .addFields({name : "Support Server", value: "`Coming Soon`", inline : true})
    .addFields({name : "Help Command Usage", value: "`help [name command or module]`", inline : true})
      .addFields({name : "❯ Command's Name", value: `${command.config.name}`, inline: true})
      .addFields({name : "❯ Command's Description", value: `${command.config.description || "None"}`, inline: true})
      .addFields({name : "❯ Command's Usage", value: "`" + `${command.config.usage || "No Usage"}` + "`", inline: true})
      .addFields({name : "❯ Command's Aliases", value: "`" + `${command.config.aliases}` + "`", inline: true})
      //  .setDescription(
        //  `
          //  - **Command's Description** __${command.config.description ||
          //    "There is no Description for this command."}__
          //  - **Command's Usage:** __${command.config.usage || "No Usage"}__
          //  - **Command's Permissions:** __${command.config.accessableby ||
          //   "Members"}__
          //  - **Command's Aliases:** __${command.config.aliases ||
          //   "No Aliases"}__
         // `
        //)
        .setColor("RANDOM")
      .setFooter(
        `Don't include <> or [], it's mean <> is required and [] is optional`,
        "https://media.discordapp.net/attachments/739051913651159071/750732937166848080/12-125584_computer-icons-information-angle-logo-brand-nfl-atlanta-removebg-preview_1.png?width=374&height=391"
      );

      message.channel.send(embed);
    }
  }
};

module.exports.config = {
  name: "help",
  description: "",
  usage: "/helpV2",
  accessableby: "Members",
  aliases: ["helpV2"]
};
