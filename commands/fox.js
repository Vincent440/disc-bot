const axios = require("axios");

const getRandomFoxImage = () => axios.get("https://randomfox.ca/floof/");


module.exports = {
  name: "fox",
  description: "\`>fox\` - Shows a random Fox image",
  execute(message, args) {
    getRandomFoxImage()
      .then((foxRes) => {
        message.channel.send(foxRes.data.image);
      })
      .catch((foxApiError) => {
        console.log(foxApiError)
        return message.channel.send('Sorry there was an error retrieving the fox image. \nPlease try again later!');
        ;
      });
  },
};
