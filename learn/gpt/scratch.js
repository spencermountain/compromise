import gpt from './api.js'
import fs from 'fs'

let res = await gpt(`generate 150 example adjective-superlative pairs. Please ensure each word has a common superlative conjugation`)
console.log(res.text)



fs.writeFileSync('./out.txt', res.text, { flag: 'a' })
