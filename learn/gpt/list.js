import gpt from './api.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const dir = path.dirname(fileURLToPath(import.meta.url))
import words from '/Users/spencer/mountain/compromise/data/lexicon/adjectives/adjectives.js'
const language = 'italian'
let size = 10

const doN = async function (n) {
  let prompt = `For each of these english adjectives, translate it to ${language}. Use the dictionary form. Also include it's italian adverb form. Format results as "[english, italian, adverb]"
For example, for the input 'careful' return "['careful', 'attento', 'attentamente']".

`
  let todo = words.slice(n * size, (n * size) + size)
  if (todo.length === 0) {
    return false
  }
  prompt += todo.map(str => str += ':').join('\n')
  // console.log(prompt)
  let res = await gpt(prompt)
  console.log(res.text)
  fs.writeFileSync(dir + '/out.txt', res.text, { flag: 'a' })
  return true
}

let more = await doN(0)
// for (let i = 0; i < 1000; i += 1) {
//   let more = await doN(i)
//   if (!more) {
//     break
//   }
// }
console.log('done')