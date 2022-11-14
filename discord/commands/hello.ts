import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("post")
    .setDescription("great command!")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("douYin Full Share Link")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("desc")
        .setDescription("custom description for posting")
        .setRequired(false)
    ),
  async execute(interaction: any) {
    await interaction.reply("World!");
  },
};
