module.exports = {
  name: "avatar",
  description: "\`>avatar\` - Displays your avatar",
  execute(message, args) {
    message.channel.send(message.author.displayAvatarURL());
  },
};
