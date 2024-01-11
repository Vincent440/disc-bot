const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription(
      'Returns information on the current server. Name and total members.'
    )
    .setDMPermission(false),
  async execute (interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(
      `This server is ${interaction.guild.name} and it currently has ${interaction.guild.memberCount} members.`
    )
  }
}
