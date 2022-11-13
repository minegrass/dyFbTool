import { getVidUrlFromUrl } from "./getVidUrlFromUrl";
import { uploadVid } from "./uploadVid";

export const postVid = async (DYUrl: string, desc: string) => {
  const url = await getVidUrlFromUrl(DYUrl);
  if (url) {
    // console.log(url);
    const status = await uploadVid(url, encodeURIComponent(`${desc}`));
    if (status) {
      console.log("video published");
    }
  }
};
