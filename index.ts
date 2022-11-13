import { postVid } from "./vidFunc/postVid";

const DY_Url = "https://www.douyin.com/video/7163943639389834509";
const regex = ":/.*/"; // used to get description + url from DY share message...

const convertInput = (input: string) => {
  const wholeSentence = input.match(regex);
  if (wholeSentence) {
    const resultArr = wholeSentence[0].split("https://");
    const result = {
      desc: resultArr[0].substring(3),
      link: `https://${resultArr[1]}`,
    };
    if (result.link) {
      return result;
    } else {
      console.error("error:no link");
    }
  } else {
    console.error("noob input");
  }
};

const main = (input: string) => {
  const result = convertInput(input);
  if (result) {
    postVid(result.link, result.desc);
  }
};
