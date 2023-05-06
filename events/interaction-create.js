const { Events } = require('discord.js');
const newEraCommands = require('../new-era-commands');
const FormatCodeService = require('../services/format-code');

module.exports = {
  name: Events.InteractionCreate,
  execute: () => async (interaction) => {
    if (interaction.isCommand()) {
      const command = newEraCommands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }

    if (interaction.isModalSubmit()) {
      try {
        if (interaction.customId === FormatCodeService.modalId) {
          await FormatCodeService.handleModalSubmit(interaction);
          return;
        }
        interaction.reply({ content: 'Unknown modal submit', ephemeral: true });
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};
