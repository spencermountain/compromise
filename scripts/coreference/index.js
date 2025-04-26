import corpus from 'nlp-corpus'
import nlp from '../../src/three.js'

const start = 80000
const list = corpus.all().slice(start, start + 1000)
list.forEach(str => {
  const doc = nlp(str)
  const out = {}
  doc.pronouns().forEach(p => {
    const n = p.refersTo()
    if (n.found) {
      out[p.text('normal')] = n.text('normal')
    }
  })
  if (Object.keys(out).length) {
    // console.log(JSON.stringify([str, out], null, 2) + ',\n')
  }
})
