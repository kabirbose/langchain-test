"use strict";

import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import FirecrawlApp, {
  CrawlParams,
  CrawlStatusResponse,
} from "@mendable/firecrawl-js";

import "dotenv/config";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
});

const fc = new FirecrawlApp({ apiKey: process.env.FC_API_KEY });

async function qroqQuery() {
  const messages = [
    new SystemMessage("Translate the following from English into Italian"),
    new HumanMessage("hi!"),
  ];

  const message = await model.invoke(messages);
  return message;
}

async function scrapeSite(url: string) {
  const scrapeResponse = await fc.scrapeUrl(url, {
    formats: ["markdown", "html"],
  });

  if (scrapeResponse) {
    console.log(scrapeResponse);
  }
}

// groqQuery();

scrapeSite(
  "https://jobs.ashbyhq.com/snowflake/152b293d-ec65-4862-8957-7f50089728ac/application?gh_src=ed5543a62&utm_source=Q2P9NP2NNP&utm_medium=phenom-feeds"
);
