/* eslint-disable no-console, no-unused-vars */
import * as dotenv from 'dotenv'
dotenv.config()
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const gpt = async function (input) {
  let words = input.split(' ')
  const completion = await openai.createCompletion({
    // model: "gpt-4",
    model: "text-davinci-003",
    prompt: input,
    max_tokens: 3900, //4097 - (words.length * 2) - 10,
    temperature: 0.7,
    n: 1,
  });
  console.log('[' + completion.data.usage.total_tokens, 'tokens ', completion.data.choices[0].finish_reason + ']\n')
  return completion.data.choices[0]
}

export default gpt
// let res = await gpt('please generate a list of 275 adjective - comparative pairs')
// console.log(res)