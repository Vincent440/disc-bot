const mtg = require('mtgsdk')


module.exports = {
  name: "mtg",
  description: "\`>mtg\` - Searches for a Magic The Gathering Card",
  args: true,
  cooldown: 6,
  execute(message, args) {
    const query = args.join(' ').trim()
    console.log(query)
    if (query) {
      return mtg.card.where({ name: query, pageSize: 1 })
        .then(cardList => {
          // console.log(query)
          // console.log(cardList)
          // console.log(cardList[0].name)
          message.channel.send(cardList[0]?.imageUrl ?? "No cards found, sorry try again!")
        }).catch(mtgError => {
          console.log(mtgError)
        }
        )

    }

    return message.channel.send("No cards found, please try a different search.");
  },
  // aliases: ["mtg","magic"],
  usage: "<card name>",
};
