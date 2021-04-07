module.exports = {
  name: "args",
  description: "Responds with arguments provided after command",
  args: true,
  execute(message, args) {
    if (args[0] === "foo") {
      return message.channel.send("bar");
    }
    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
  },
};
