const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "profile",
  category: "💰 | Economy",
  run: async (bot, message, args) => {
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(userArgs[0]) ||
      message.guild.members.cache.find(
        x =>
          x.user.username.toLowerCase() === userArgs.slice(0).join(" ") ||
          x.user.username === userArgs[0]
      ) ||
      message.member;

  let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
  if (money === null) money = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let anonym = await db.fetch(`anonym_${message.guild.id}_${user.id}`)
    if(anonym === null) anonym = ''
    if(anonym === true) anonym = 'Anonym'
    
  let mask = await db.fetch(`mask_${message.guild.id}_${user.id}`)
    if(mask === null) mask = ''
    if(mask === true) mask = ', Mask'

  let bow = await db.fetch(`bow_${message.guild.id}_${user.id}`)
  if(bow === null) bow = '0'

  let Pole = await db.fetch(`pole_${message.guild.id}_${user.id}`)
  if(Pole === null) Pole = '0'

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor(message.guild.me.displayHexColor)
  .setDescription(`**${user.user.username}'s Profile**\n\nPocket: ${money}\nBank: ${bank}\nRoles: ${anonym}${mask}\n\n**Inventory**\nBow: ${bow}\nFishing Pole: ${Pole}`)
  .setTimestamp()
  message.channel.send(moneyEmbed)
  }
};
