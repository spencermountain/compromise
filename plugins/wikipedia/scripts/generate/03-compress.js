import { pack } from 'efrt'
import fs from 'fs'
import conf from '../../config.js'
import { blue, yellow } from 'colorette'
const { lang, project } = conf
const output = `./files/${lang}.${project}-pageviews.json`
const model = './_model.js'

const round = n => Math.round(n * 10) / 10

const fileSize = (pathStr) => {
  let kb = fs.statSync(pathStr).size / 1024
  let num = round(kb / 1000)
  return num.toLocaleString() + 'mb'
}

const compress = function () {
  let arr = JSON.parse(fs.readFileSync(output))
  console.log(yellow('\ncompressing', arr.length.toLocaleString(), 'articles'))
  const smol = pack(arr)
  fs.writeFileSync(model, `export default \`` + smol + '`')
  console.log('output:', blue(fileSize(model)))
}
export default compress