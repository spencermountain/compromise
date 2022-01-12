import corpus from 'nlp-corpus'
import nlp from '../../../src/one.js'
import plugin from '../src/index.js'
nlp.extend(plugin)

const n = 1000
console.log(` -- pre-processing ${n.toLocaleString()} sentences-`)
let docs = corpus.all().slice(0, n)
docs = docs.map(str => nlp(str))
console.log(` -- ok, ready --`)

docs.forEach(doc => {
  doc.wikipedia().debug()
})