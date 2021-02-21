const axios = require("axios");

const getRandomDadJoke = () => axios({
  method: "get",
  url: "https://icanhazdadjoke.com/",
  headers: {
    Accept: "text/plain",
    "User-Agent": "DiscBot - vinceshury@gmail.com",
  },
});

module.exports = {
  name: "joke",
  description: "\`>joke\` - Tells a random joke",
  execute(message, args) {
    getRandomDadJoke()
    .then((res) => message.channel.send(res.data))
    .catch((apiError) => {
      console.log(apiError);
      return message.channel.send('Sorry there was an error retrieving dad joke, please try again later')
    });
  },
};
