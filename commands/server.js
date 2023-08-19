const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription(
      'Returns information on the current server. Name and total members.'
    )
    .setDMPermission(false),
  async execute (interaction) {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.user.id}`
    )
  }
}
