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
    "Get count of numbers greater than or equal to 2 from the table testtable. numbers are n";
  const messages = [
    new SystemMessage(
      `Convert the statement into a Postgres SQL query. 
      Just the query itself, no other AI boilerplate. 
      Keep it as short and simple as possible.
      Remove whitespace and make sure the entire query is on one line.
      `
    ),
    new HumanMessage(query),
  ];

  const result = await model.invoke(messages);
  // console.log(result.content);

  const response = await db.run(result.content as string);
  console.log(response);
}

queryWithAI();
