const { Events } = require('discord.js')

module.exports = {
  name: Events.GuildMemberAdd,
  execute (member) {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(
      channelToNotify => channelToNotify.name === 'general'
    )
    console.log(member)
    console.log(channel)
    // Do nothing if the channel wasn't found on this server
    if (!channel) return
    // Send the message, mentioning the member
    channel.send(`Welcome to ${member.guild.name}, ${member}`)
  }
}
