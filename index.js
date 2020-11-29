//===============================================DASBOARD===============================================
const express = require("express");
const app = express();
const _PORT = process.env.PORT || 8080;
//===============================================BATAS DASBOARD=========================================
const { token, default_prefix } = require("./config.json");
const { config } = require("dotenv");
const Discord = require("discord.js");
const bot = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const db = require("quick.db");
const alexa = require("alexa-bot-api");
let ai = new alexa("aw2plm");
const { addexp } = require("./handlers/xp.js");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(bot);
});

bot.on("ready", () => {
  console.log("RPLM Bot is online senpai >_<");

  //===============================================BOT STATUS===============================================
  let setatus = [
    "Saekyo",
    `${bot.guilds.cache.size} servers`,
    `${bot.channels.cache.size} channels`,
    `${bot.users.cache.size} users`,
    `Made with 💙 by Saekyo`
  ];
  setInterval(() => {
    let index = Math.floor(Math.random() * (setatus.length - 1) + 1);

    bot.user.setActivity(`${db.get(`status`)} | ` + setatus[index], {
      type: "STREAMING",
      URL: "https://www.twitch.tv/chilledcatradio"
    });
  }, 500000);

  //===============================================NOTIF BOT RESTART==========================================
  const upchannel = bot.channels.cache.get("777100262808354827");
  const upembed = new Discord.MessageEmbed()
    .setThumbnail(bot.user.avatarURL())
    .setTitle("Bot restart Notification")
    .setDescription(
      "Maybe some glitch or my owner restarted me I am back online"
    );
  upchannel.send(upembed);
});

//===============================================BOT DASBOARD===============================================
const socketStats = require("socketstats");
const server = new socketStats(app, bot);

server.listen(_PORT, () => {
  console.log("Listening to port: " + _PORT);
});

//STOP

//============================================================================================================

bot.on("message", async message => {
  if (message.author.bot) return;

  //===============================================ALEXA CHATBOT===============================================
  if (message.channel.id === "777134013386063883") {
    let content = message.content;

    ai.getReply(content).then(r => message.channel.send(r));
  }

  if (message.content === "<@776649248543735848>") {
    let prefix = db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = default_prefix;
    const Menembed = new Discord.MessageEmbed().setDescription(
      `My Prefix in this guild is \`${prefix}\` \nTo get started type \`${prefix}help\``
    );
    message.channel.send(Menembed);
  }

  //===============================================AFK COMMANDS===============================================
  const nik = "[AFK]";
  const afterAfk = message.member.displayName.replace(nik, "");

  if (message.author.bot || message.channel.type === "dm") return;

  let afk = new db.table("AFKs"),
    authorStatus = await afk.fetch(message.author.id),
    mentioned = message.mentions.members.first();

  let memafk;
  if (message.mentions.users.first()) {
    memafk = message.mentions.users.first();
  } else {
    memafk = message.author;
  }

  if (mentioned) {
    let status = await afk.fetch(mentioned.id);

    if (status) {
      const embed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setAuthor(`${memafk.username} is currently AFK`)
        .setThumbnail(memafk.displayAvatarURL({ format: "png", dynamic: true }))
        .addField(`Reason`, ` ${status}`)
        .setFooter("AFK since ")
        .setTimestamp();
      message.channel.send(embed).then(i => i.delete({ timeout: 5000 }));
    }
  }

  if (authorStatus) {
    message.member.setNickname(afterAfk);
    const embed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`**${message.author.tag}** is no longer AFK.`);
    message.channel.send(embed).then(i => i.delete({ timeout: 5000 }));
    afk.delete(message.author.id);
  }

  //===============================================RPLM VERIFY===============================================
  if (message.content === `/verify`) {
    if (message.channel.id !== "775355622794592277") {
      return;
    }
    await message.delete();
    await message.member.roles.add("774940086198337536");
  }

  //END

  //====================================================================================================================

  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let cmdx = db.get(`cmd_${message.guild.id}`);

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd);
    if (cmdy) message.channel.send(cmdy.responce);
  }
  let command = bot.commands.get(cmd);
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));
  if (command) command.run(bot, message, args);

  //===============================================XP NOTIF===============================================
  return addexp(message);
});

//====================================================================================================================

//EVENT COMMANDS

//==========================================BOT NOTIF JOIN SERVER======================================
bot.on("guildCreate", guild => {
  const channelId = "769433563795161088";
  const channel = bot.channels.cache.get(channelId);
  const sowner = guild.owner.user;
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setTitle("I Joined A Guild!")
    .setDescription(
      `**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}\n**Owner:** ${sowner.tag}`
    )
    .setTimestamp()
    .setColor("GREEN")
    .setFooter(`I'm In ${bot.guilds.cache.size} Guilds Now!`);
  channel.send(embed);
});

//==========================================BOT NOTIF LEFT SERVER ===================================
bot.on("guildDelete", guild => {
  const channelId = "769433563795161088";
  const channel = bot.channels.cache.get(channelId);
  const sowner = guild.owner.user;
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setTitle("I Left A Guild!")
    .setDescription(
      `**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}\n**Owner:** ${sowner.tag}`
    )
    .setTimestamp()
    .setColor("RED")
    .setFooter(`I'm In ${bot.guilds.cache.size} Guilds Now!`);
  channel.send(embed);
});

//==========================================WELCOME MESSAGE==========================================
bot.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);
  if (chx === null) {
    return;
  }

  bot.channels.cache.get(chx).send(`.      　。　　　　•　    　ﾟ　　。
　　.　　　.　　　  　　.　　　　　。　　   。　.
 　.　　      。　        ඞ   。　    .    •
 •            . ${member.user.username} join the room.　 。　.
                        ${member.guild.memberCount} player remain
　 　　。　　　　　　ﾟ　　　.　　　　　.
,　　　　.　 .　　       .               。`);
});

//==========================================LEAVE MESSAGE==========================================
bot.on("guildMemberRemove", async member => {
  let chx = db.get(`leavechannel_${member.guild.id}`);
  if (chx === null) {
    return;
  }

  bot.channels.cache.get(chx).send(`.      　。　　　　•　    　ﾟ　　。
　　.　　　.　　　  　　.　　　　　。　　   。　.
 　.　　      。　        ඞ   。　    .    •
 •            . ${member.user.username} was The Impostor.　 。　.
                        ${member.guild.memberCount} impostor remain
　 　　。　　　　　　ﾟ　　　.　　　　　.
,　　　　.　 .　　       .               。`);
});

//==========================================REACTION ADD==========================================
bot.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return
  let message = await reaction.message;
  if (
    message.reactions.cache.forEach(reaction =>
      reaction.users.cache.has(user.id)
    )
  ) {
    console.log("yes");
  }
  let menus = db.get(`rr_${message.guild.id}`);
  let menu;
  let menuIndex;
  if (!menus) return;
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].ChannelID == message.channel.id && menus[i].ID == message.id) {
      menuIndex = i;
      menu = menus[i];
    }
  }
  if (!menu) return;
  let role;
  for (let i = 0; i < menu.roles.length; i++) {
    let type = reaction.emoji.id ? reaction.emoji.id : reaction.emoji.name;
    if (type == menu.roles[i].reaction) {
      role = menu.roles[i].role;
    }
  }
  if (menu.type != "single") {
    role = message.guild.roles.cache.find(x => x.id == role);
    if (!role) return;
    let member = message.guild.members.cache.find(x => x.id == user.id);
    if (!member) return;
    if (member.roles.cache.has(role.id)) return;
    member.roles.add(role.id);
    return;
  } else {
    console.log(menu.usersReacted)
    if (menu.usersReacted.includes(user.id)){
      await reaction.users.remove(user.id);
      return user
        .send(
          "You have already took role from this reaction set and you cannot take another!"
        )
        .catch(e => {
          return;
        });
    }
    role = message.guild.roles.cache.find(x => x.id == role);
    if (!role) return;
    let member = message.guild.members.cache.find(x => x.id == user.id);
    if (!member) return;
    if (member.roles.cache.has(role.id)) return;
    member.roles.add(role.id);
    menu.usersReacted.push(user.id);
    menus[menuIndex] = menu;
    db.set(`rr_${message.guild.id}`, menus);
    return;
  }
}); 

//=======================================Reaction Remove=========================================================
bot.on("messageReactionRemove", async (reaction, user) => {
  if (user.bot) return
  let message = await reaction.message;
  let menus = db.get(`rr_${message.guild.id}`);
  let menu;
  let menuIndex;
  if (!menus) return;
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].ChannelID == message.channel.id && menus[i].ID == message.id) {
      menu = menus[i];
      menuIndex = i;
    }
  }
  if (!menu) return;
  let role;
  for (let i = 0; i < menu.roles.length; i++) {
    let type = reaction.emoji.id ? reaction.emoji.id : reaction.emoji.name;
    if (type == menu.roles[i].reaction) {
      role = menu.roles[i].role;
    }
  }
  if (menu.type != "single") {
    role = message.guild.roles.cache.find(x => x.id == role);
    if (!role) return;
    let member = message.guild.members.cache.find(x => x.id == user.id);
    if (!member) return;
    if (!member.roles.cache.has(role.id)) return;
    member.roles.remove(role.id);
    return;
  } else {
    role = message.guild.roles.cache.find(x => x.id == role);
    if (!role) return;
    let member = message.guild.members.cache.find(x => x.id == user.id);
    if (!member) return;
    if (!member.roles.cache.has(role.id)) return;
    console.log(menu.usersReacted)
    if (menu.usersReacted.includes(user.id)) {
      let index;
      for (let i = 0; i < menu.usersReacted.length; i++) {
        if (menu.usersReacted[i] == user.id) {
          index = i;
        }
      }
      if (index) {
        menu.usersReacted.splice(index, 1);
        console.log(menu.usersReacted)
        menus[menuIndex] = menu;
        db.set(`rr_${message.guild.id}`, menus);
      }
    }
    member.roles.remove(role.id);
    return;
  }
});

bot.login(token);
