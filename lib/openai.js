import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const request = async (prompt) =>
  await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 2048,
    prompt,
  });

export default request;
