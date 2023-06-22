import gpt from './api.js'
import fs from 'fs'

let res = await gpt(`generate 150 italian adjectives in dictionary form, with their adverb form. Return results as 'adjective|adverb'.`)
console.log(res.text)



fs.writeFileSync('./out.txt', res.text, { flag: 'a' })
