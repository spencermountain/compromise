import gpt from './api.js'
import fs from 'fs'

let res = await gpt(`generate a list of 150 infinitive - past-participle verb conjugation pairs, in the format 'infinitive|participle'`)
console.log(res.text)
fs.writeFileSync('./out.txt', res.text, { flag: 'a' })
