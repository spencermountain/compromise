import corpus from 'nlp-corpus'
import nlp from '../../src/three.js'

let start = 80000
let list = corpus.all().slice(start, start + 1000)
list.forEach(str => {
  let doc = nlp(str)
  let out = {}
  doc.pronouns().forEach(p => {
    let n = p.refersTo()
    if (n.found) {
      out[p.text('normal')] = n.text('normal')
    }
  })
  if (Object.keys(out).length) {
    // console.log(JSON.stringify([str, out], null, 2) + ',\n')
  }
})
