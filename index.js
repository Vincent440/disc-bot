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
const dogImageApiURL = 'https://dog.ceo/api/breed'
const dadJokeApiURL = 'https://icanhazdadjoke.com/'
const dadJokeApiConfig = {
  headers: {
    Accept: 'text/plain',
    'User-Agent': 'DiscBot - vinceshury@gmail.com'
  }
}
// Response for empty prefixed messages.
const botIntroMessage = `**Hello! I'm DiscBot**
I will respond to messages that are prefixed by \`>command-name\`

Example
\`>help\` - Lists all available commands
`
// Command list of all available commands.
const helpCommandList = `**DiscBot Command List**

\`>server\` - Displays current server information
\`>user-info\` - Displays username and ID
\`>joke\` - Tells a random joke
\`>dog\` - Shows a random Dog image
\`>avatar\` - Displays your avatar

`
// *Works In Progress*

// Simple dad joke API
const getDadJoke = () => axios.get(dadJokeApiURL, dadJokeApiConfig)
const getRandomDogImage = () => axios.get(`${dogImageApiURL}s/image/random`)

// Connect to the Discord
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  console.log(
    `#${message.channel.name}-@${message.author.username}#${message.author.discriminator}`
  )
  console.log(message.cleanContent)
  console.log('-'.repeat(20))

  const newMessage = message.content.toLowerCase()

  switch (newMessage) {
    case `${prefix}help`:
      message.channel.send(helpCommandList)
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
    case `${prefix}joke`:
      getDadJoke()
        .then(res => message.channel.send(res.data))
        .catch(apiError => console.log(apiError))
      break
    case `${prefix}avatar`:
      message.channel.send(message.author.displayAvatarURL())
      break
    case `${prefix}dog`:
      getRandomDogImage()
        .then(dogRes => {
          message.channel.send(dogRes.data.message)
        })
        .catch(dogApiError => console.log(dogApiError))
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



// TODOS
// https://owlbot.info/?q=parrot
// Animal/dictionary API to solve Alex's >parakeet nonsense. 