const axios = require('axios')
const { SlashCommandBuilder } = require('@discordjs/builders')

const getRandomCatImage = () =>
  axios({
    method: 'get',
    url: 'https://api.thecatapi.com/v1/images/search',
    headers: {
      'x-api-key': '1f77677c-c2de-4771-be2f-e01439d1c5ce'
    }
  })

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Shows a random Cat image'),
  async execute (interaction) {
    await getRandomCatImage()
      .then(catRes => {
        return interaction.reply(catRes.data[0].url)
      })
      .catch(catApiError => {
        console.log(catApiError)
        return interaction.reply(
          'Sorry there was an error retrieving the cat image. \nPlease try again later!'
        )
      })
  }
}
