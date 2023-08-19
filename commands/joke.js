const axios = require('axios')
const { SlashCommandBuilder } = require('discord.js')

const getRandomDadJoke = () =>
  axios({
    method: 'get',
    url: 'https://icanhazdadjoke.com/',
    headers: {
      Accept: 'text/plain',
      'User-Agent': 'DiscBot - vinceshury@gmail.com'
    }
  })

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Tells a random joke, from the icanhazdadjoke API.'),
  async execute (interaction) {
    await getRandomDadJoke()
      .then(res => interaction.reply(res.data))
      .catch(apiError => {
        console.log(apiError)
        return interaction.reply(
          'Sorry there was an error retrieving dad joke, please try again later'
        )
      })
  }
}
