const discord = require("discord.js");
module.exports = {
  name: "screenshot",
  category: "🛠 | Utility",
  aliases: ["ss"],
  description: "Screenshot the webpage",
  run: async (bot, message, args) => {
    if(!message.channel.nsfw) return message.reply("You must be in NSFW channel to use this command")
    
    let auth = process.env.THUMapi
    let url = args[0]
    let image  = "https://image.thum.io/get/width/1920/crop/675/auth/" + auth + "/" + url
    if(!url) return message.channel.send(`Please specify the url`)
    message.channel.send(image)
   
    
    }
};
