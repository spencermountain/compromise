import corpus from 'nlp-corpus'
import nlp from '../src/three.js'
const docs = corpus.some(13)
docs.forEach(str => {
  nlp(str).debug({ tags: false, chunks: true })
})
