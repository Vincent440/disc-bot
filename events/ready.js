// When the client is ready, run this code (only once)

module.exports = {
  name: 'ready',
  once: true,
  execute (client) {
    console.log(`${client.user.tag} is logged in & ready for commands.`)
  }
}
