import gpt from './api.js'
import fs from 'fs'

let res = await gpt(`generate 150 nouns and return them in a 'singular|plural' format'`)
console.log(res.text)



fs.writeFileSync('./out.txt', res.text, { flag: 'a' })
