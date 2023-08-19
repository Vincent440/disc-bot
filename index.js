'use strict'
require('dotenv').config()

const fs = require('fs')
const path = require('node:path')

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js')

const { DISCORD_TOKEN } = process.env

// const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'))

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command)
}
// for (const eventFile of eventFiles) {
//   const event = require(`./events/${eventFile}`)
//   if (event.once) {
//     client.once(event.name, (...args) => event.execute(...args, client))
//   } else {
//     client.on(event.name, (...args) => event.execute(...args, client))
//   }
// }

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('VinBot#9905 is Ready!')
})

// Listen for interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    })
  }
})

// login to Discord with your app's token
client.login(DISCORD_TOKEN)
