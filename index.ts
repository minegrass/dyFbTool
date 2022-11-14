import express from "express";
require("dotenv").config();
import { botLogin } from "./discord/discordBot";
import { getVidUrlFromUrl } from "./vidFunc/getVidUrlFromUrl";
botLogin();

const { SERVER_PORT } = process.env;
const app = express();

app.get("/", (req, res) => {
  res.send("OK!");
});

app.listen(SERVER_PORT || 3000, () => {
  console.log(`listening to ${SERVER_PORT || 3000}`);
});
