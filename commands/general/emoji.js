const Discord = require("discord.js");

module.exports = {
  name: "emoji",
  category: "🌏 | General",
  description: "Count the emoji in this server",
  run: async (bot, message, args) => {
   const { MessageEmbed } = require("discord.js")
    let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id){
            return bot.emojis.cache.get(id).toString()
        }
        message.guild.emojis.cache.forEach(emoji => {
            OverallEmojis++;
            if(emoji.animated) {
                Animated++
                EmojisAnimated+=Emoji(emoji.id)
            } else {
                EmojiCount++;
                Emojis+=Emoji(emoji.id)
            }
        })
        let embed = new MessageEmbed()
        .setTitle(`Emoji in ${message.guild}`)
        .addField(`Animated [${Animated}]`, EmojisAnimated || `None`)
        .addField(`Emoji [${EmojiCount}]`, Emojis || `None`)
        .addField('Total Emoji', OverallEmojis || `None`)
        message.channel.send(embed);
  }
};
