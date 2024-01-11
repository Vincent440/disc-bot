const { SlashCommandBuilder } = require('discord.js')

const API_URL = 'https://randomfox.ca/floof/'

const getRandomFoxImage = async () => {
  return fetch(API_URL)
    .then(response => response.json())
    .then(responseData => responseData)
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fox')
    .setDescription('Shows a random Fox image. Awe look how cute they are!'),
  async execute (interaction) {
    await getRandomFoxImage()
      .then(data => {
        return interaction.reply(data.image)
      })
      .catch(foxApiError => {
        console.error(foxApiError)
        return interaction.reply(
          'Sorry there was an error retrieving the fox image. \nPlease try again later!'
        )
      })
  }
}
