/* eslint-disable no-console, no-unused-vars */
import * as dotenv from 'dotenv'
dotenv.config()
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const gpt = async function (input) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: input,
    max_tokens: 4000, //4097
    temperature: 0.9,//0.6,
    n: 1,
  });
  console.log('[' + completion.data.usage.total_tokens, 'tokens ', completion.data.choices[0].finish_reason + ']\n')
  return completion.data.choices[0]
}

export default gpt
// let res = await gpt('please generate a list of 275 adjective - comparative pairs')
// console.log(res)