module.exports = {
  name: 'user',
  description: '`>user` - Displays username and ID',
  execute (message, args) {
    message.channel.send(
      `Your username: ${message.author.username}\nYour ID: ${message.author.id}`
    )
  }
}
