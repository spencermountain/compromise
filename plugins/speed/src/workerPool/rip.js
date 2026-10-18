import { splitSentences } from '../_lib/sentences.js'

const rip = (text, nlp, batchSize) => {
  const batches = []
  let batch = ''
  splitSentences(text, nlp).forEach(sentence => {
    if (batch && batch.length + sentence.length > batchSize) {
      batches.push(batch)
      batch = ''
    }
    batch += sentence
  })
  if (batch) {
    batches.push(batch)
  }
  return batches
}

export default rip
