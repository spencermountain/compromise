import streamFileIterator from './iterator.js'
import fromDocs from '../_lib/document.js'

const streamFile = async function (path, fn, opts = {}) {
  const docs = []
  for await (const doc of streamFileIterator.call(this, path, opts)) {
    const match = await fn(doc)
    if (opts?.collect !== false && match?.found) {
      match.docs.forEach(terms => docs.push(terms))
    }
  }
  return fromDocs(this, docs)
}

export default { lib: { streamFile, streamFileIterator } }
