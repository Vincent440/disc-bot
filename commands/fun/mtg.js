const mtg = require('mtgsdk')


module.exports = {
  name: "mtg",
  description: "\`>mtg\` - Searches for a Magic The Gathering Card",
  args: true,
  cooldown: 5,
  execute(message, args) {
    const query = args.join(' ').trim()
    console.log(query)
    if (query) {
      return mtg.card.where({ name: query, pageSize: 1 })
        .then(cardList => {

          message.channel.send(cardList[0]?.imageUrl ?? "No cards found, sorry try again!")
        }).catch(mtgError => {
          console.log(mtgError)
        })

    }

    return message.channel.send("No cards found, please try a different search.");
  },
  usage: "[card name]",
};
