"use strict";

import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import "dotenv/config";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
});

async function query() {
  const messages = [
    new SystemMessage("Translate the following from English into Italian"),
    new HumanMessage("hi!"),
  ];

  const message = await model.invoke(messages);
  console.log(message.content);
}
// query();
