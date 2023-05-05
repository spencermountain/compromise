import gpt from './api.js'
import fs from 'fs'

let res = await gpt(`generate example 150 [infinitive, gerund] verb pairs`)
console.log(res.text)



fs.writeFileSync('./out.txt', res.text, { flag: 'a' })
