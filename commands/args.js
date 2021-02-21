module.exports = {
  name: "args-info",
  description: "Responds with arguements provided after command",
  execute(message, args) {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}!`
      );
    }
    message.channel.send(`Command name:    \`${this.name}\` \n\n${args.length} Arguments \n\`${args}\``);

  },
};
