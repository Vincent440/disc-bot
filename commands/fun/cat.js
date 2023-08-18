const axios = require('axios')

const getRandomCatImage = () =>
  axios({
    method: 'get',
    url: 'https://api.thecatapi.com/v1/images/search',
    headers: {
      'x-api-key': '1f77677c-c2de-4771-be2f-e01439d1c5ce'
    }
  })

module.exports = {
  name: 'cat',
  description: '`>cat` - Shows a random Cat image',
  execute (message, args) {
    if (args[0] === 'zoom') {
      return message.channel.send('https://youtu.be/TDNP-SWgn2w')
    }

    getRandomCatImage()
      .then(catRes => {
        return message.channel.send(catRes.data[0].url)
      })
      .catch(catApiError => {
        console.log(catApiError)
        return message.channel.send(
          'Sorry there was an error retrieving the cat image. \nPlease try again later!'
        )
      })
  }
}
