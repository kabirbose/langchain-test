"use strict";

import "dotenv/config";
import { ChatGroq } from "@langchain/groq";

const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
});

const input = `Translate "I love programming" into French.`;

const invokeModel = async (input: string) => {
  try {
    return await llm.invoke(input);
  } catch (error) {
    console.error("Error invoking model:", error);
    return "An error occurred while processing the request.";
  }
};

(async () => {
  const response = await invokeModel(input);
  console.log(response);
})();
