const {MessageEmbed} = require('discord.js');

module.exports = (bot) => {

    bot.on('message', message => {

        const {guild, author, member, channel} = message;

        // getting our wanted suggestion channel by id
        let suggestionChannel = message.guild.channels.cache.find(
      x =>
        x.name === "suggestion" ||
        x.name === "suggestions" ||
        x.name === "💌•❥•suggestion"
    );
        // fetching all the channels messages
        suggestionChannel.messages.fetch().then(suggestion => { 
            
            // we make sure the channel we write in is the suggestion channel
            if (channel === suggestionChannel) {

                // if the newest message is not by the bot
                if (suggestion.first().author.id !== bot.user.id && author.id !== bot.user.id) { 
                    
                    // delete our message
                    message.delete();

                    suggestionChannel.send(
                        new MessageEmbed()
                        
                        .setColor('WHITE')
                        .setTitle(`New Suggestion from ${member.displayName}`)
                        .setDescription(`${suggestion.first().content}`)
                        .setFooter('Want to make a suggestion?\nWrite in this channel!'))
                        .then(message => {
                        message.react('✅');
                        message.react('❌');
                    });
                    // else we return nothing for the bot to spam
                } else {
                    return
                }
            }
        });

    });
}