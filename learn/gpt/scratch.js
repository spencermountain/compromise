import gpt from './api.js'
import fs from 'fs'

let res = await gpt(`generate a list of 200 adjective - comparative pairs, in the format 'adjective|comparative'`)
console.log(res.text)
fs.writeFileSync('./out.txt', res.text, { flag: 'a' })
