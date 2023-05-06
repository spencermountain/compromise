import gpt from './api.js'
import fs from 'fs'

let res = await gpt(`generate 130 examples of adjectives with their noun form, like "quick, quickness"`)
console.log(res.text)



fs.writeFileSync('./out.txt', res.text, { flag: 'a' })
