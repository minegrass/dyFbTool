import {
  Client,
  GatewayIntentBits,
  messageLink,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  TextChannel,
  MessageActionRowComponentBuilder,
  REST,
  Routes,
  Events,
} from "discord.js";
import e from "express";
import { postVid } from "../vidFunc/postVid";
import { getVidId } from "../vidFunc/getVidId";
import axios from "axios";
require("dotenv").config();

const { BOT_TOKEN, KING_ID, GUILD_ID, BOT_CLIENT_ID, PAGE_TOKEN } = process.env;
if (!BOT_TOKEN || !KING_ID || !GUILD_ID || !BOT_CLIENT_ID || !PAGE_TOKEN) {
  console.error("Failed to initialized, env config does'nt meet requirement");
  throw Error;
}

const disabledCheckBtn = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId("disabled")
    .setLabel("Completed")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(true)
);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "post") {
    await interaction.reply({ content: "Processing", ephemeral: true });
    const link = interaction.options.getString("link", true);
    const desc = interaction.options.getString("desc", false);
    // console.log(link);
    const videoId = await getVidId();
    const status = await postVid(videoId, link);
    const checkBtn = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`check[${videoId}]`)
        .setLabel("CHECK")
        .setStyle(ButtonStyle.Primary)
    );
    if (status) {
      console.log("all good");
      await interaction.followUp({
        content: "In Progress..",
        components: [checkBtn],
      });
    }
  }
});

client.on("interactionCreate", async (action: any) => {
  if ((action.customId as string)?.includes("check")) {
    const regex = /\[.*\]/i;
    const videoId = action.customId.match(regex)![0].slice(1, -1);
    const checkBtn = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`check[${videoId}]`)
        .setLabel("CHECK")
        .setStyle(ButtonStyle.Primary)
    );
    const statusUri = `https://graph.facebook.com/v13.0/${videoId}/?fields=status&access_token=${PAGE_TOKEN}`;
    const statusResponse = await axios.get(statusUri);
    await action.deferUpdate();
    if (statusResponse.data.status.publishing_phase.status == "complete") {
      await action.editReply({
        content: `checking progress of id:${videoId} data:${JSON.stringify(
          statusResponse.data
        )}`,
        components: [disabledCheckBtn],
      });
    } else if (statusResponse.data.status.video_status == "error") {
      await action.editReply({
        content: `checking progress of id:${videoId} data:${JSON.stringify(
          statusResponse.data
        )}`,
        components: [disabledCheckBtn],
      });
    } else {
      await action.editReply({
        content: `checking progress of id:${videoId} data:${JSON.stringify(
          statusResponse.data
        )}`,
        components: [checkBtn],
      });
    }
  }
});

client.once("ready", () => {
  console.log("Bot Online");
});

export const botLogin = () => {
  client.login(BOT_TOKEN);
};
