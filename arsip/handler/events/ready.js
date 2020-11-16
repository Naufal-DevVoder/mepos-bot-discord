const Discord = require("discord.js");
module.exports = bot => {
  console.log(`${bot.user.username} now is online`);
//  bot.channels.cache.get("id channel nya").join();
  let status = ["Saekyo", `${bot.guilds.cache.size} servers`,`${bot.channels.cache.size} channels` ,`${bot.users.cache.size} users`];
  setInterval(() => {
    let index = Math.floor(Math.random() * (status.length - 1) + 1);
    
  bot.user.setActivity("Maintenance | " + status[index], { type: "STREAMING" , URL:"https://www.twitch.tv/chilledcatradio"});
}, 8000);

}