import axios from "axios";
require("dotenv").config();
const { PAGE_ID, PAGE_TOKEN } = process.env;
export const uploadVid = async (videoUrl: string, description: string) => {
  try {
    const uploadStartUri = `https://graph.facebook.com/v13.0/${PAGE_ID}/video_reels?upload_phase=start&access_token=${PAGE_TOKEN}`;
    const initiateUploadResponse = await axios.post(uploadStartUri);
    const videoId = initiateUploadResponse.data.video_id;
    const uploadBinaryUri = `https://rupload.facebook.com/video-upload/v13.0/${videoId}`;
    const uploadBinaryResponse = await axios({
      method: "post",
      url: uploadBinaryUri,
      maxBodyLength: Infinity,
      headers: Object.assign(
        {},
        { Authorization: `OAuth ${PAGE_TOKEN}` },
        { file_url: videoUrl } // Headers when video url is entered
      ),
    });
    const isUploadSuccessful = uploadBinaryResponse.data.success;
    if (isUploadSuccessful) {
      //   console.log("good");
      const PublishReelsURI = `https://graph.facebook.com/v13.0/${PAGE_ID}/video_reels?upload_phase=finish&video_id=${videoId}&title=${""}&description=${description}&access_token=${PAGE_TOKEN}&video_state=PUBLISHED`;
      const publishResponse = await axios.post(PublishReelsURI);
      const hasInitiatedPublishing = publishResponse.data.success;
      if (hasInitiatedPublishing) {
        return true;
      }
    }
  } catch (e) {
    console.log(e);
  }
};
