const Discord = require('discord.js');
const config = require('./config.json');
const { token, default_prefix } = require("./config.json")
const db = require('quick.db');
const bot = new Discord.Client({disableEveryone: true});

require("./util/eventHandler")(bot)
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on("message", async message => {
  const nik = '[AFK]';  
  const afterAfk = message.member.displayName.replace(nik,'');
  
    if(message.author.bot || message.channel.type === "dm") return;
  
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
      .setColor("RANDOM")
     .setAuthor(`${memafk.username} is currently AFK`)
   .setThumbnail(memafk.displayAvatarURL({ format: "png", dynamic: true }))
   .addField(`Reason`,` ${status}`)
   .setFooter("AFK since ")
   .setTimestamp()
      //.setDescription(`This user (${mentioned.user.tag}) is AFK: **${status}**`)
      message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    }
  }
  
  if (authorStatus) {
    message.member.setNickname(afterAfk);
   // message.member.setNickname(message.author.username);
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`**${message.author.tag}** is no longer AFK.`)
    message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    afk.delete(message.author.id)
  }
  
  // SWAERWORDS COMMAND
  const swearWords = ["Kontol", "kontol", "Nigga", "nigga", "anjing","memek", "Ngentod","Ngewe"];
  if (swearWords.some(word => message.content.includes(word))) {
    message.delete();
  }
    
  // COMMAND STATS MEMBER COUNT
  //let countChannel = {
  //total: "725388920803557451",
  //member: "730730920646148137",
  //bots: "730730946986508328",
  //serverID: "725388920803557447"
//} 
// Replace ID with the channel ID and server ID (for serverID)
// Follow the instructions: https://youtu.be/UmY0Gsx3KlI?t=44

// We're gonna doing the same thing if member/bot left the server.
//bot.on("guildMemberAdd", member => {
 // if (member.guild.id !== countChannel.serverID) return; // Avoid leaking.
  
  //bot.channels.cache.get(countChannel.total).setName(`Total Users: ${member.guild.memberCount}`);
  //bot.channels.cache.get(countChannel.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
  //bot.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
//})

//bot.on("guildMemberRemove", member => {
  //if (member.guild.id !== countChannel.serverID) return;
  
  //bot.channels.cache.get(countChannel.total).setName(`Total Users: ${member.guild.memberCount}`);
  //bot.channels.cache.get(countChannel.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
  //bot.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
//})
  
  // BATAS BAWAH 
if(message.author.bot) return;
  if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
    //let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)


})

bot.login(config.token);