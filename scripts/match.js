import corpus from 'nlp-corpus'
import nlp from '../src/three.js'

let docs = corpus.some(13)
docs = docs.map(str => nlp(str))

let match = process.argv.slice(2).join(' ')
match = match.trim()
match = match || '#Noun+'

docs.forEach(doc => {
  let m = doc.match(match)
  if (m.found) {
    m.debug({ highlight: true, tags: false })
    console.log('\n')
  }
})
