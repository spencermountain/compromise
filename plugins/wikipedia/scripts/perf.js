import corpus from 'nlp-corpus'
import nlp from '../../../src/one.js'
import plugin from '../src/index.js'
nlp.extend(plugin)

const n = 100
console.log(` -- processing ${n.toLocaleString()} sentences-`)
let docs = corpus.all().slice(0, n)

let found = {}

docs.forEach(str => {
  let doc = nlp(str)
  let res = doc.wikipedia().json({ normal: true })
  res.forEach(o => {
    if (o.normal === 'in') {
      console.log(str)
    }
    found[o.normal] = found[o.normal] || 0
    found[o.normal] += 1
  })
})
console.log(found)