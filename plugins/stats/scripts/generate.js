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

let tmp = corpus.all()
console.log(tmp.length, 'sentences')
let txt = tmp.join(`\n`)

// let txt = 'toronto raptors play a toronto maple leafs'
let doc = nlp(txt)//.compute('root')
let out = doc.freq()


// out = pack(out)
// out = "export default `" + out + "`"
out = "export default " + JSON.stringify(out)
fs.writeFileSync('./src/tfidf/_model.js', out)
console.log(fileSize('./src/tfidf/_model.js'))
