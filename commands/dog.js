const axios = require('axios')
const { SlashCommandBuilder } = require('@discordjs/builders')

const getRandomDogImage = () =>
  axios.get('https://dog.ceo/api/breeds/image/random')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Shows a random Dog image.'),
  async execute (interaction) {
    await getRandomDogImage()
      .then(dogRes => {
        return interaction.reply(dogRes.data.message)
      })
      .catch(dogApiError => {
        console.log(dogApiError)
        return interaction.reply(
          'Sorry there was an error retrieving the dog image. \nPlease try again later!'
        )
      })
  }
}
