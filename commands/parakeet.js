module.exports = {
  name: "parakeet",
  description: "Shhh, its a secret",
  execute(message, args) {
    message.channel.send("What made you want to search for parakeets?");
  },
};
