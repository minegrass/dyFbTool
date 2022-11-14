import { getVidUrlFromUrl } from "./getVidUrlFromUrl";
import { uploadVid } from "./uploadVid";
import { convertInput } from "./convertInput";

/**
 * params: DyShareLinkString, CustomDesc(optional), success callback
 * final function auto post to fb page when take in a DYShareLink
 *
 */
export const postVid = async (
  videoId: string,
  input: string,
  desc?: string
) => {
  const link = convertInput(input);
  if (link) {
    const result = await getVidUrlFromUrl(link);
    if (result && result.link) {
      // console.log(url);
      console.log(result.desc);
      const uploadStatus = await uploadVid(
        videoId,
        result.link,
        encodeURIComponent(`${desc ? desc : result.desc}`)
      );
      if (uploadStatus && uploadStatus.status) {
        return { status: true, checkVidStatus: uploadStatus.checkVidStatus };
      } else {
        return false;
      }
    }
  }
};
