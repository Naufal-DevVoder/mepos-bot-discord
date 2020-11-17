const { Random } = require("something-random-on-discord")
const random = new Random();
 
module.exports = {
  name: "advice",
  category: "😄 | Fun",
  aliases : "Advice",
  
  description: "Get Fresh Advice :D",
run: async (bot, message, args) => {
  
    let data = await random.getAdvice()
    message.channel.send(data)
  
}
}