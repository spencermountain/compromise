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

let docs = 1000

// let sentences = corpus.all()
let sentences = corpus.some(docs)
console.log(sentences.length, 'sentences')
// let txt = tmp.join(`\n`)


let counts = {}
sentences.forEach(txt => {
  let doc = nlp(txt)
  doc.compute('root')
  let out = doc.freq()
  Object.entries(out).forEach(a => {
    counts[a[0]] = counts[a[0]] || 0
    counts[a[0]] += 1
  })
})
// filter low-counts
counts = Object.entries(counts)
counts = counts.filter(a => a[1] > 1)

counts = counts.map(a => {
  // IDF = (Total number of documents) / (total number of documents containing the keyword)
  a[2] = Math.log10(docs / a[1])
  a[2] = Math.round(a[2] * 100) / 100 // round to 2 digits
  a[2] = a[2].toFixed(2)
  return a
})
counts = counts.sort((a, b) => {
  if (a[1] > b[1]) {
    return -1
  } else if (a[1] < b[1]) {
    return 1
  }
  return 0
})

// collect by freq
let byFreq = {}
counts.forEach(a => {
  let k = String(a[2])
  byFreq[k] = byFreq[k] || []
  byFreq[k].push(a[0])
})
console.log(byFreq)

//compress each key
Object.keys(byFreq).forEach(k => {
  byFreq[k] = pack(byFreq[k])
})


let out = "export default " + JSON.stringify(byFreq, null, 2)
fs.writeFileSync('./src/tfidf/_model.js', out)
console.log(fileSize('./src/tfidf/_model.js'))
