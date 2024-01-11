const { SlashCommandBuilder } = require('discord.js')

const API_URL = 'https://icanhazdadjoke.com/'

const requestOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'User-Agent': 'DiscBot - vinceshury@gmail.com'
  }
}

const getRandomDadJoke = () => {
  return fetch(API_URL, requestOptions)
    .then(response => response.json())
    .then(responseData => responseData)
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Tells a random joke, from: https://icanhazdadjoke.com/ '),
  async execute (interaction) {
    await getRandomDadJoke()
      .then(data => interaction.reply(data.joke))
      .catch(apiError => {
        console.log(apiError)
        return interaction.reply(
          'Sorry there was an error retrieving dad joke, please try again later'
        )
      })
  }
}
