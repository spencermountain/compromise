import { pack } from 'efrt'
import fs from 'fs'
import conf from '../config.js'
const { lang, project } = conf
const output = `./files/${lang}.${project}-pageviews.json`


const fileSize = (pathStr) => {
  let kb = fs.statSync(pathStr).size / 1024
  return Math.round(kb) + 'kb'
}

let arr = JSON.parse(fs.readFileSync(output))

console.log('compressing', arr.length.toLocaleString(), 'articles')
const smol = pack(arr)
console.log(fileSize(smol))
fs.writeFileSync('./en-articles.js', `export default \`` + smol + '`')