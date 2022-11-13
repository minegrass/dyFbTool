import {
  Builder,
  By,
  Key,
  until,
  WebDriver,
  Capabilities,
} from "selenium-webdriver";
import { config } from "dotenv";
import chrome from "selenium-webdriver/chrome";

config();

export const getVidUrlFromUrl = async (url: string) => {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        .headless()
        .addArguments(`user-agent=${process.env.MY_UA}}`)
    )
    .build();
  try {
    await driver.get(url);
    await driver.wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath(
            '//*[@id="root"]/div/div[2]/div/div/div[1]/div[2]/div/xg-video-container/video'
          )
        )
      ),
      3000
    );
    const video = await driver.findElement(
      By.xpath(
        '//*[@id="root"]/div/div[2]/div/div/div[1]/div[2]/div/xg-video-container/video/source'
      )
    );
    const srcUrl = await video.getAttribute("src");
    console.log("found it");
    return srcUrl.toString();
  } catch (e) {
    if (e) {
      console.error(e);
      return null;
    }
  } finally {
    await driver.quit();
  }
};
