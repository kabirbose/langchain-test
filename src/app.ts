"use strict";

import "dotenv/config";
import { ChatGroq } from "@langchain/groq";
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

async function queryWithAI() {
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: new DataSource({
      type: "postgres",
      host: process.env.PG_HOST || "localhost",
      port: Number(process.env.PG_PORT) || 5432,
      username: process.env.PG_USER || "postgres",
      password: process.env.PG_PASSWORD || "postgres",
      database: process.env.PG_DATABASE || "postgres",
    }),
  });

  const model = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
  });

  const query =
    "Create a new table called spongebobcharacters and add 5 random characters from Spongebob as strings. The characters will be called character";
  const messages = [
    new SystemMessage(
      `
      Convert the statement into a Postgres SQL query. 
      Just the query itself, no other AI boilerplate.
      Remove unecessary whitespace, ensure the entire query is on one line.
      `
    ),
    new HumanMessage(query),
  ];

  const result = await model.invoke(messages);

  await db.run(result.content as string);
  console.log(result.content);
}

queryWithAI();
