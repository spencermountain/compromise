import gpt from './api.js'
import fs from 'fs'

let res = await gpt(`generate 150 example infinitive verbs, conjugated to present-tense. Return them in the form 'infinitive|present'`)
console.log(res.text)



fs.writeFileSync('./out.txt', res.text, { flag: 'a' })
