module.exports = {
  name: 'avatar',
  aliases: ['icon', 'pfp'],
  description: '`>avatar` - Displays your avatar',
  execute (message, args) {
    message.channel.send(message.author.displayAvatarURL())
  }
}
