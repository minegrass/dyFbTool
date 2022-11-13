import https from "https";
import fs from "fs";

export const downloadVid = (url: string, callback: Function) => {
  https.get(url, function (res) {
    const fileStream = fs.createWriteStream("video.mp4");
    res.pipe(fileStream);
    fileStream.on("finish", function () {
      fileStream.close();
      callback();
    });
  });
};
