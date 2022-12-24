import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("postvid")
    .setDescription("post a vid!")
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
  
};
