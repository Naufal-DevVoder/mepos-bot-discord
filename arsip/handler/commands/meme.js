const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports.run = async (bot, message, args) => {
  if (message.channel.id == "613979762527830028"){
    message.channel.send("You can't use this command in general chat")
    // If the channel it wasn't verification channel, ignore it.
    return;}
    
    const subReddits = ["meme", "me_irl", "dankmeme"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);

    const embed = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setImage(img)
    .setTitle(`From /r/${random}`)
    .setURL(`http://reddit.com/${random}`)
    .setFooter(`Thanks for using ${bot.user.username}`)

    message.channel.send(embed);
  

}

module.exports.config = {
    name: "meme",
    description: "Send fresh meme",
    usage: "/meme",
    accessableby: "Members",
    aliases: ["Meme"]
}