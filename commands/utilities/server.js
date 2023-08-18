module.exports = {
  name: 'server',
  description: '`>server` - Displays current server information',
  serverOnly: true,
  execute (message, args) {
    message.channel.send(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
    )
  }
}
