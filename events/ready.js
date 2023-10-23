// When the client is ready, run this code (only once)
const { Events } = require('discord.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute (client) {
    console.log(`${client.user.tag} is logged in & ready for commands.`)
  }
}
