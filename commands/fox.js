const axios = require('axios')
const { SlashCommandBuilder } = require('@discordjs/builders')

const getRandomFoxImage = () => axios.get('https://randomfox.ca/floof/')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fox')
    .setDescription('Shows a random Fox image. Awe look how cute they are!'),
  async execute (interaction) {
    await getRandomFoxImage()
      .then(foxRes => {
        return interaction.reply(foxRes.data.image)
      })
      .catch(foxApiError => {
        console.log(foxApiError)
        return interaction.reply(
          'Sorry there was an error retrieving the fox image. \nPlease try again later!'
        )
      })
  }
}
