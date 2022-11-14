import axios from "axios";
require("dotenv").config();
const { PAGE_ID, PAGE_TOKEN } = process.env;

export const getVidId = async () => {
  const uploadStartUri = `https://graph.facebook.com/v13.0/${PAGE_ID}/video_reels?upload_phase=start&access_token=${PAGE_TOKEN}`;
  const initiateUploadResponse = await axios.post(uploadStartUri);
  const videoId = initiateUploadResponse.data.video_id;
  return videoId as string;
};
