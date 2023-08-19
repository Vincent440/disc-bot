const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Displays your avatar.'),
  async execute (interaction) {
    await interaction.reply({
      content: interaction.user.displayAvatarURL(),
      ephemeral: true
    })
  }
}
