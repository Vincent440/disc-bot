'use strict'
require('dotenv').config()

// const fs = require('fs')

// Require the necessary discord.js classes
const { Client, /* Collection, */ Intents } = require('discord.js')
const { DISCORD_TOKEN } = process.env

// const commandFolders = fs.readdirSync('./commands')
// const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'))

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

// client.commands = new Collection()

// for (const folder of commandFolders) {
//   const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'))
//   for (const file of commandFiles) {
//     // Gets all files from the commands folder.
//     const command = require(`./commands/${folder}/${file}`)

//     // Set a new item in the collection
//     // with the key as the command name and the value as the exported module
//     client.commands.set(command.name, command)
//   }
// }

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
  console.log('Ready!')
})

// login to Discord with your app's token
client.login(DISCORD_TOKEN)
