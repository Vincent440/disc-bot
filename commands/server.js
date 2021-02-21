module.exports = {
  name: "server",
  description: "\`>server\` - Displays current server information",
  execute(message, args) {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  },
};
