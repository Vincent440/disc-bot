'use strict'
require('dotenv').config()
const axios = require('axios')

// Get the discord.js module
const Discord = require('discord.js')
// Grab the prefix look for in commands.
const { prefix } = require('./config.json')
// Get the Discord API token.
const DISCORD_TOKEN = process.env.DISCORD_TOKEN
// create a new Discord client
const client = new Discord.Client()

// Response for empty prefixed messages.
const botIntroMessage = `
**Hello! I'm DiscBot**
I will respond to messages that are prefixed by \`>\`
*To list all currently available commands* **type** \`>help\`
`
// Command list of all available commands.
const helpCommandList = `
**DiscBot Command List**

\`>help\` - Lists all available commands

\`>ping\` - Responds \`Pong\`
\`>beep\` - Responds \`Boop\`
\`>server\` - Displays server information
\`>user-info\` - Displays username and ID
\`>joke\` - Responds with a random joke
\`>avatar\` - Displays your avatar

*No Work In Progress commands currently*
`
// Simple dad joke API
const getDadJoke = () => {
  return axios.get('https://icanhazdadjoke.com/', {
    headers: { 'Accept': 'text/plain', 'User-Agent':'DiscBot - vinceshury@gmail.com'}
  })
}

// Connect to the Discord
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  console.log(message.cleanContent)

  const newMessage = message.content.toLowerCase()

  switch (newMessage) {
    case `${prefix}ping`:
      message.channel.send('Pong.')
      break
    case `${prefix}beep`:
      message.channel.send('Boop.')
      break
    case `${prefix}server`:
      message.channel.send(
        `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
      )
      break
    case `${prefix}user-info`:
      message.channel.send(
        `Your username: ${message.author.username}\nYour ID: ${message.author.id}`
      )
      break
    case `${prefix}help`:
      message.channel.send(helpCommandList)
      break
    case `${prefix}joke`:
      getDadJoke()
        .then(res => message.channel.send(res.data))
        .catch(apiError => console.log(apiError))
      break
    case `${prefix}avatar`:
			message.channel.send(message.author.displayAvatarURL());
      break
    case prefix:
      message.channel.send(botIntroMessage)
      break
  }
})

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(
    channelToNotify => channelToNotify.name === 'general'
  )
  // Do nothing if the channel wasn't found on this server
  if (!channel) return
  // Send the message, mentioning the member
  channel.send(`Welcome to ${member.guild.name}, ${member}`)
})

// login to Discord with your app's token
client.login(DISCORD_TOKEN)
