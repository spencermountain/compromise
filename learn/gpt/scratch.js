import gpt from './api.js'
import fs from 'fs'

let res = await gpt(`generate 150 single-words that describe a feeling.`)
console.log(res.text)



fs.writeFileSync('./out.txt', res.text, { flag: 'a' })
