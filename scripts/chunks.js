import corpus from 'nlp-corpus'
import nlp from '../src/three.js'
let docs = corpus.some(13)
console.log(docs)
docs.forEach(str => {
  nlp(str).compute('chunks').debug({ tags: false, chunks: true })
})
