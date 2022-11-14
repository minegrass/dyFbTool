import axios from "axios";
require("dotenv").config();
const { PAGE_ID, PAGE_TOKEN } = process.env;

/**
 *  upload video to facebook page reels
 *
 */
export const uploadVid = async (
  videoId: string,
  videoUrl: string,
  description: string
) => {
  try {
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
        const statusUri = `https://graph.facebook.com/v13.0/${videoId}/?fields=status&access_token=${PAGE_TOKEN}`;
        const checkVidStatus = async () => {
          const statusResponse = await axios.get(statusUri);
          console.log(statusResponse.data.status.video_status);
          return statusResponse;
        };
        return { status: true, checkVidStatus: checkVidStatus };
      }
    }
  } catch (e) {
    console.log(e);
  }
};
