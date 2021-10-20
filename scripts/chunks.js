import corpus from 'nlp-corpus'
import nlp from '../src/three.js'
let docs = corpus.some(13)
docs.forEach(str => {
  nlp(str).debug({ tags: false, chunks: true })
})
