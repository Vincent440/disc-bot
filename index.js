'use strict'
require('dotenv').config()

const fs = require('fs')
const path = require('node:path')

// Require the necessary discord.js classes
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require('discord.js')
const { DISCORD_TOKEN } = process.env

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter(file => file.endsWith('.js'))

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] })

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

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client))
  } else {
    client.on(event.name, (...args) => event.execute(...args, client))
  }
}

// login to Discord with your app's token
client.login(DISCORD_TOKEN)
