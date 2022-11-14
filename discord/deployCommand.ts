const { REST, Routes } = require("discord.js");
require("dotenv").config();

const { BOT_TOKEN, KING_ID, GUILD_ID, BOT_CLIENT_ID } = process.env;
if (!BOT_TOKEN || !KING_ID || !GUILD_ID || !BOT_CLIENT_ID) {
  console.error("Failed to initialized, env config does'nt meet requirement");
  throw Error;
}
const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);
(async () => {
  try {
    console.log(`Started refreshing application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(BOT_CLIENT_ID, GUILD_ID),
      { body: [require("./commands/hello").data.toJSON()] }
    );

    console.log(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
