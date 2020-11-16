const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.Token);
const config = require("./config.json");
const { prefix, Token } = require("./config.json");
client.login(Token);
client.on("message", async message => {
  console.log("❯ Rejs senpai " + client.user.username + " is now online!");
  console.log("❯ Gateway ping : " + client.ws.ping + "ms");
  console.log(message.author.username + " menggunakan bot Saekyo");
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  // COMMAND CLEAR
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  
  //Status Bot
  let status = [
    "My code",
    "/help",
    "With Rejs senpai >_<",
    "Stay safe"
  ];
  setInterval(() => {
    let index = Math.floor(Math.random() * (status.length - 1) + 1);
    client.user.setActivity(" | " + status[index]);
  }, 8000);
  client.user.setStatus("online");

  //command say
  if (command === "say") {
    let text = args.join(" ");
    if (!text) return message.reply("Please give me some text to say! :)");
    message.delete();
    message.channel.send(text);
  }

  // HELP COMMAND
  else if (message.content === prefix + "help") {
    message.channel.send("Mohon maaf bot Saekyo sedang dalam perbaikan :)");
    message.delete();
  }

  //ping command
  else if (message.content === prefix + "ping") {
    message.channel.send("🏓 Pong! `" + client.ws.ping + "ms`");
    message.delete({ timeout: 4000 }); //angkanya bebas
  }

  // MORE COMMAND
  else if (message.content === "<@725432896533299200>") {
    message.channel.send("Iya apa " + message.author.toString() + " >////<");
  } else if (message.content.startsWith("poke")) {
    let userToMention = message.mentions.users.first();
    message.channel.send("Mention: " + userToMention.toString());
  } else if (message.content === "Hai") {
    message.channel.send("Hai juga " + message.author.toString() + " >_<");
  } else if (message.content === "hai") {
    message.channel.send("Hai juga " + message.author.toString() + " >_<");
  } else if (message.content === "Hi") {
    message.channel.send("Hai juga " + message.author.toString() + " >_<");
  } else if (message.content === "hi") {
    message.channel.send("Hai juga " + message.author.toString() + " >_<");
  } else if (message.content === "Halo") {
    message.channel.send("Halo juga " + message.author.toString() + " >_<");
  } else if (message.content === "halo") {
    message.channel.send("Halo juga " + message.author.toString() + " >_<");
  } else if (message.content === prefix + "beep") {
    message.channel.send("!boop");
  } else if (message.content === "tes") {
    message.channel.send("Tos!");
  } else if (message.content === "Tes") {
    message.channel.send("Tos!");
  }

  //Kill Command
  else if (message.content.startsWith(`${prefix}kill`)) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.channel.send("Please include who you are killing.");
    }
    message.delete();
    return message.channel.send(
      message.author.username + " Killed " + user.username
    );
  }

  //USER INFO
  else if (message.content === prefix + "user-info") {
    const RichEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      )
      .setThumbnail(
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      )
      .addField("❯ Bot", message.author.bot ? "True" : "False", true)
      .addField(
        "❯ Status",
        "```" + message.author.presence.status + "```",
        true
      )
      .addField("❯ Join", "```" + message.member.joinedAt + "```")
      .addField("❯ Register", "```" + message.author.createdAt + "```")
      .addField(
        "❯ Roles",
        message.member.roles.cache.map(r => `${r}`).join(" , ")
      )
      .setTimestamp()
      .setFooter("Id : " + message.author.id);
    message.channel.send(RichEmbed);
    message.delete({ timeout: 4000 }); //angkanya bebas
  }

  // AVATAR COMMAND
  else if (message.content === prefix + "avatar") {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Avatar")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ format: "jpg" })
      )
      .setImage(
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      );
    message.channel.send(exampleEmbed);
    message.delete({ timeout: 4000 }); //angkanya bebas
  }

  // BOT INFO COMMAND
  else if (message.content === prefix + "bot-info") {
    const botEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        "Bot Information",
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      )
      .setThumbnail(
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      )
      .setTitle("Donate")
      .setURL("https://saweria.co/donate/Saekyo")
      .addField("❯ Bot ping","```" + client.ws.ping + "ms```")
      .addField("❯ Bot Name", "```Saekyo#1965```")
      .addField("❯ Bot Id", "```725432896533299200```")
      .addField("❯ Created By", "```Rejs#9735```")
      .addField("❯ Created At", "```" + client.user.createdAt + "```")
      .setFooter("© Made by rejs#9735")
      .setTimestamp();
    message.channel.send(botEmbed);
    message.delete({ timeout: 4000 }); //angkanya bebas
  }

  // SERVER INFO COMMAND
  else if (message.content === prefix + "server-info") {
    const serverEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Donate")
      .setURL("https://saweria.co/donate/Saekyo")
      .setAuthor(message.guild.name, message.guild.iconURL({ format: "png" }))
      .setThumbnail(message.guild.iconURL({ format: "png" }))
      .addField("❯ Name", "```" + message.guild.name + "```", true)
      .addField("❯ ID", "```" + message.guild.id + "```", true)
      .addField("❯ Owner", "```" + message.guild.owner.user.tag + "```", true)
      .addField(
        "❯ Region",
        "```" + message.guild.region.toUpperCase() + "```",
        true
      )
      .addField("❯ Members", "```" + message.guild.memberCount + "```", true)
      .addField("❯ Roles", "```" + message.guild.roles.cache.size + "```", true)
      .addField(
        "❯ Channels",
        "```" +
          message.guild.channels.cache.filter(
            channel => channel.type !== "category"
          ).size +
          "```",
        true
      )
      .addField("❯ Creation Date", "```" + message.guild.createdAt + "```")
      .setTimestamp();
    message.channel.send(serverEmbed);
    message.delete({ timeout: 4000 });
  }

  // WARN TOXIC SANGAT PENTING AMJING
  const swearWords = ["Kontol", "kontol", "Nigga", "nigga"];
  if (swearWords.some(word => message.content.includes(word))) {
    message.reply("Oh no you said a bad word!!!");
    message.delete();
  }

  //Clear Command
  else if (cmd === prefix + "clear") {
    let argu = messageArray.slice(1);
    if (message.deletable) {
      message.delete();
    }
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Missing Permission").then(m => m.delete(5000));
    }
    if (isNaN(argu[0]) || parseInt(argu[0]) <= 0) {
      return message.reply("This is not number").then(m => m.delete(5000));
    }
    let deleteAmount;
    if (parseInt(argu[0]) > 100) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt(argu[0]);
    }
    message.channel
      .bulkDelete(deleteAmount, true)
      .catch(err => message.reply("something went wrong…" + err));
  }

  //COINFLIP COMMAND  
  else if (message.content.startsWith(prefix + "coinflip")) {
    var choices = ["heads", "tails"];

    var output = choices[Math.floor(Math.random() * choices.length)];

    message.reply(`You got **${output}!**`);
  }

  //TALK COMMAND
  else if (message.content.startsWith(prefix + "talk tes")) {
    var tes = ["tos", "Iya apa sayang", "Apa BGST", "TAI Lu AMJING"];

    var output = tes[Math.floor(Math.random() * tes.length)];

    message.reply(`**${output}!**`);
  }

  // POLL Command
  else if (cmd === "/poll") {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Missing Permission").then(m => m.delete(5000));
    }
    let pollChannel = message.mentions.channels.first();
    let pollDescription = args.slice(1).join(" ");

    let embedPoll = new Discord.MessageEmbed()
      .setTitle("😲 New Poll! 😲")
      .setDescription(pollDescription)
      .setColor("RANDOM");
    let msgEmbed = await pollChannel.send(embedPoll);
    await msgEmbed.react("👍");
    await msgEmbed.react("👎");
    message.delete();
  }

  // MINESWEEPER COMMAND (ep 14)
  else if (message.content.startsWith(`${prefix}mine`)) {
    const Minesweeper = require("discord.js-minesweeper");

    const minesweeper = new Minesweeper({
      returnType: "emoji"
    });
    var mines = minesweeper.start();
    message.channel.send(mines);
  }

  // LYRICS FINDER COMMAND (ep 13)
  else if (message.content.startsWith(`${prefix}lyrics`)) {
    const genius = require("genius-lyrics");
    const G = new genius.Client(process.env.GENIUS);

    G.tracks
      .search(
        message.content
          .split(" ")
          .slice(1)
          .join(" "),
        { limit: 1 }
      )
      .then(results => {
        const song = results[0];
        message.channel.send(
          `**${song.artist.name} - ${song.title}**\n<${song.url}>`
        ); //song.lyrics
      })
      .catch(err => message.reply(err));
  }
  
   //SLOWMODE COMMAND (episode 8)
  else if(message.content.startsWith(`${prefix}slowmode`)) {
    var time = message.content.split(' ').slice(1).join(' ')
    if(!time) return message.reply('Please enter a time in seconds!')
   message.channel.setRateLimitPerUser(time)
     message.channel.send('Set the slowmode!')
  }

  //ANNOUNCEMENT COMMAND
  else if (cmd === "/announce") {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Missing Permission").then(m => m.delete(5000));
    }
    let announceChannel = message.mentions.channels.first();
    let announceDescription = args.slice(1).join(" ");

    let embedAnnouncement = new Discord.MessageEmbed()
      .setTitle("😲 Announcement! 😲")
      .setDescription(announceDescription)
      .setColor("RANDOM");
    let msgEmbed = await announceChannel.send(embedAnnouncement);
    message.delete();
  }

  // EMOJI COMMAND
  else if (message.content.startsWith(prefix + "emoji")) {
    var emoji = [
      "( ͡° ͜ʖ ͡°)",
      "¯\\_(ツ)_/¯",
      "ʕ•ᴥ•ʔ",
      "(▀̿Ĺ̯▀̿ ̿)",
      "(ง ͠° ͟ل͜ ͡°)ง",
      "ಠ_ಠ",
      "̿'̿'\\̵͇̿̿\\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿",
      "[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]",
      "﴾͡๏̯͡๏﴿ O'RLY?",
      "[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]",
      "(ᵔᴥᵔ)",
      "(¬‿¬)",
      "(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)",
      "(づ￣ ³￣)づ",
      "ლ(ಠ益ಠლ)",
      "ಠ╭╮ಠ",
      "♪~ ᕕ(ᐛ)ᕗ",
      "ヾ(⌐■_■)ノ♪",
      "◉_◉",
      "\\ (•◡•) /",
      "༼ʘ̚ل͜ʘ̚༽",
      "┬┴┬┴┤(･_├┬┴┬┴",
      "ᕦ(ò_óˇ)ᕤ",
      "┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻",
      "（╯°□°）╯︵( .o.)",
      "ಠ‿↼",
      "◔ ⌣ ◔",
      "(ノಠ益ಠ)ノ彡┻━┻",
      "(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)",
      "̿ ̿ ̿'̿'̵͇̿̿з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿",
      "(;´༎ຶД༎ຶ`)",
      "♥‿♥",
      "ᕦ(ò_óˇ)ᕤ",
      "(•_•) ( •_•)>⌐■-■ (⌐■_■)",
      "⌐╦╦═─ ಠ_ಠ , (¬‿¬)",
      "˙ ͜ʟ˙",
      ":')",
      "(°ロ°)☝",
      "ಠ⌣ಠ",
      "(；一_一)",
      "( ⚆ _ ⚆ )",
      "☜(⌒▽⌒)☞",
      "(ʘᗩʘ')",
      "¯\\(°_o)/¯",
      "ლ,ᔑ•ﺪ͟͠•ᔐ.ლ",
      "(ʘ‿ʘ)",
      "ಠ~ಠ",
      "ಠ_ಥ",
      "ಠ‿↼",
      "(>ლ)",
      "(ღ˘⌣˘ღ)",
      "ಠoಠ",
      "ರ_ರ",
      "◔ ⌣ ◔",
      "(✿´‿`)",
      "ب_ب",
      "┬─┬﻿ ︵ /(.□. ）",
      "☼.☼",
      "^̮^",
      "(>人<)",
      ">_>",
      "(/) (°,,°) (/)",
      "(･.◤)",
      "=U",
      "~(˘▾˘~)",
      "| (• ◡•)| (❍ᴥ❍ʋ)"
    ];

    var output = emoji[Math.floor(Math.random() * emoji.length)];
    message.delete();
    message.channel.send(`**${output}!**`);
  }
});
