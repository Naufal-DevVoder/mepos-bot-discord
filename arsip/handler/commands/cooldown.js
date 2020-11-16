const usedCommand = new Set();
module.exports.run = async (bot, message, args) => {
    if(usedCommand.has(message.author.id)){
        message.reply('You cannot use the command beacuse of the cooldown.')
    } else {
        const m = await message.channel.send("Pinging...");
    m.edit(`🏓Latency is `+"`"+`${m.createdTimestamp - message.createdTimestamp}ms` +"`"+ ` || API Latency is `+"`"+`${Math.round(bot.ws.ping)}ms`+"`"+``);

        
        usedCommand.add(message.author.id);
        setTimeout(() => {
            usedCommand.delete(message.author.id);
        }, 10000); //You can set the ammount of the cooldown here! Its Formated to Miliseconds.
    }
}

module.exports.config = {
    name: "cooldown",
    description: "a Simple test of the Cooldown Command.",
    usage: "/cooldown",
    accessableby: "Members",
    aliases: []
}