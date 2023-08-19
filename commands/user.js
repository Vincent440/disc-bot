const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Displays your Discord username and Id.'),
  async execute (interaction) {
    await interaction.reply({
      content: `Your tag: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`,
      ephemeral: true
    })
  }
}
