import gpt from './api.js'
import fs from 'fs'

let res = await gpt(`generate 120 adverb-adjective pairs, in the format 'adjective|adverb'`)
console.log(res.text)



fs.writeFileSync('./out.txt', res.text, { flag: 'a' })
