import corpus from 'nlp-corpus'
import { pack } from 'efrt'
import fs from 'fs'
import nlp from '../../../src/three.js'
import plugin from '../src/plugin.js'
nlp.extend(plugin)

const fileSize = (pathStr) => {
  let kb = fs.statSync(pathStr).size / 1024
  return Math.round(kb) + 'kb'
}

const packList = function (obj) {
  let byNum = Object.keys(obj).reduce((h, k) => {
    let num = String(obj[k])
    h[num] = h[num] || []
    h[num].push(k)
    return h
  }, {})
  Object.keys(byNum).forEach(k => {
    byNum[k] = pack(byNum[k])
  })
  return byNum
}


let tmp = corpus.all()
// let tmp = corpus.some(1000)
console.log(tmp.length, 'sentences')
let txt = tmp.join(`\n`)

// let txt = 'toronto raptors play a toronto maple leafs'
console.log('parsing')
let doc = nlp(txt)
console.log('compute root')
doc.compute('root')
console.log('compute freq')
let out = doc.freq()

out = packList(out)
out = "export default " + JSON.stringify(out, null, 2)
fs.writeFileSync('./src/tfidf/_model.js', out)
console.log(fileSize('./src/tfidf/_model.js'))
