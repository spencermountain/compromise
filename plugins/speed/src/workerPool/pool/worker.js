import { parentPort } from 'node:worker_threads'
import nlp from 'compromise'

parentPort.on('message', ({ text, match }) => {
  const doc = nlp(text).match(match)
  parentPort.postMessage(doc.docs)
})
