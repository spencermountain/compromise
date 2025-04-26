/* eslint-disable no-console */
import corpus from 'nlp-corpus'
import fs from 'fs'
import nlp from '../../../src/three.js'
import plugin from '../src/plugin.js'
nlp.extend(plugin)
import idf from '../src/tfidf/idf.js'
import zipUp from './pack.js'

const fileSize = (pathStr) => {
  const kb = fs.statSync(pathStr).size / 1024
  return Math.round(kb) + 'kb'
}

// let txt = corpus.some(1000).join('\n')
const txt = corpus.all().join(`\n`)

const doc = nlp(txt).compute('root')
const counts = idf(doc, { use: 'root', min: 4 })

// collect by freq
const byFreq = zipUp(counts)

// console.log(counts)
const out = "export default " + JSON.stringify(byFreq, null, 2)
fs.writeFileSync('./src/tfidf/_model.js', out)
console.log(fileSize('./src/tfidf/_model.js'))
