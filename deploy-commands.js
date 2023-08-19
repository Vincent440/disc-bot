'use strict'
require('dotenv').config()

const { REST, Routes } = require('discord.js')

const fs = require('node:fs')
const path = require('node:path')

const { DISCORD_TOKEN, CLIENT_ID } = process.env

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN)

const commands = []
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  commands.push(command.data.toJSON())
}

;(async () => {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
})()
