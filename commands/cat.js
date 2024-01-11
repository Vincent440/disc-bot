const { SlashCommandBuilder } = require('discord.js')

const API_URL = 'https://api.thecatapi.com/v1/images/search'

const requestOptions = {
  method: 'GET',
  headers: {
    'x-api-key': process.env.CAT_API_KEY
  }
}

const getRandomCatImage = () => {
  return fetch(API_URL, requestOptions)
    .then(response => response.json())
    .then(responseData => responseData)
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Shows a random Cat image'),
  async execute (interaction) {
    await getRandomCatImage()
      .then(data => {
        return interaction.reply(data[0].url)
      })
      .catch(catApiError => {
        console.log(catApiError)
        return interaction.reply(
          'Sorry there was an error retrieving the cat image. \nPlease try again later!'
        )
      })
  }
}
