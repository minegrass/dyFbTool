const regex = "https://.*/"; // used to get description + url from DY share message...

/**
 * convert DY Share link into URL + Description
 *
 */
export const convertInput = (input: string) => {
  const link = input.match(regex)![0];
  if (link) {
    // console.log(link);
    return link;
  } else {
    console.error("noob input");
  }
};
