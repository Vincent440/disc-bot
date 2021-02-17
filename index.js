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
const botHelpMessage = `**Command not found**

*Please see the list of available commands*

**Example**
\`>help\` - *Help command lists all available commands*
`
// Command list of all available commands.
const helpCommandList = `**VinBot** *help* 

**Command List**

*Examples*
\`>server\` - Displays current server information
\`>user-info\` - Displays username and ID
\`>avatar\` - Displays your avatar

\`>joke\` - Tells a random joke
\`>dog\` - Shows a random Dog image
\`>cat\` - Shows a random Cat image
\`>fox\` - Shows a random Fox image

`
const dadJokeApiConfig = {
  method: 'get',
  url: 'https://icanhazdadjoke.com/',
  headers: {
    Accept: 'text/plain',
    'User-Agent': 'DiscBot - vinceshury@gmail.com'
  }
}

const catApiConfig = {
  method: 'get',
  url: 'https://api.thecatapi.com/v1/images/search',
  headers: { 
    'x-api-key': '1f77677c-c2de-4771-be2f-e01439d1c5ce'
  }
};

const getRandomDadJoke = () => axios(dadJokeApiConfig)
const getRandomDogImage = () => axios.get('https://dog.ceo/api/breeds/image/random')
const getRandomFoxImage = () => axios.get('https://randomfox.ca/floof/')
const getRandomCatImage = () => axios(catApiConfig)

// Connect to the Discord
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {

  const {bot: isAuthorBot, username} = message.author;

  // Don't do anything on messages from this bot.
  console.log(username)
  if (username === 'VinBot') return;

  console.log(
    `#${message.channel.name}
      @${message.author.username}#${message.author.discriminator}`
  )
  console.log(message.cleanContent)
  console.log('-'.repeat(20))

  // No further action if the message is from another bot.
  if (isAuthorBot === true) return;
  
  const newMessage = message.content.toLowerCase().trim()

  // No response if the message doesn't contain the command prefix
  if(newMessage[0] !== prefix) return;

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
      getRandomDadJoke()
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
    case `${prefix}cat`:
      getRandomCatImage()
        .then(catRes => {
          message.channel.send(catRes.data[0].url)
        })
        .catch(catApiError => console.log(catApiError))
      break
    case `${prefix}fox`:
      debugger
      getRandomFoxImage()
        .then(foxRes => {
          message.channel.send(foxRes.data.image)
        })
        .catch(foxApiError => console.log(foxApiError))
      break
    case `${prefix}bird`:
      message.channel.send('Still nothing for birds, sorry.')
      break
    case `${prefix}parakeet`:
      message.channel.send('What made you want to search for parakeets?')
      break
    case `${prefix}zoomcat`:
    case `${prefix}zoom-cat`:
    case `${prefix}zoom cat`:
    case `${prefix}zcat`:
      message.channel.send('https://youtu.be/TDNP-SWgn2w')
      break
    default:
    message.channel.send(botHelpMessage)
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
