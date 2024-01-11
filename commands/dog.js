const { SlashCommandBuilder } = require('discord.js')

const API_URL = 'https://dog.ceo/api/breeds/image/random'

const getRandomDogImage = () => {
  return fetch(API_URL)
    .then(response => response.json())
    .then(responseData => responseData)
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Shows a random Dog image.'),
  async execute (interaction) {
    await getRandomDogImage()
      .then(data => {
        return interaction.reply(data.message)
      })
      .catch(dogApiError => {
        console.err(dogApiError)
        return interaction.reply(
          'Sorry there was an error retrieving the dog image. \nPlease try again later!'
        )
      })
  }
}
