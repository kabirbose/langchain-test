"use strict";

import "dotenv/config";
import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://sts.dc-uoit.ca/adfs/ls?SAMLRequest=");

  await page.setViewport({ width: 1080, height: 1024 });

  await page.type("#userNameInput", "100862410");
  await page.type("#passwordInput", process.env.PASS as string);

  const submitBtn = "#submitButton";
  await page.waitForSelector(submitBtn);
  await page.click(submitBtn);

  // await browser.close();
})();
