const axios = require("axios");

const getRandomDogImage = () => axios.get("https://dog.ceo/api/breeds/image/random");

module.exports = {
  name: "dog",
  description: "\`>dog\` - Shows a random Dog image",
  execute(message, args) {
    getRandomDogImage()
    .then((dogRes) => {
      message.channel.send(dogRes.data.message);
    })
    .catch((dogApiError) => {
      console.log(dogApiError)
      return message.channel.send('Sorry there was an error retrieving the dog image. \nPlease try again later!');;
    });
  },
};
