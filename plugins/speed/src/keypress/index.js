import { splitSentences } from '../_lib/sentences.js'
import fromDocs from '../_lib/document.js'
import getCache from './_lib.js'

const keyPress = function (text, lex, opts = {}) {
  const cache = getCache(this, lex, opts)
  const next = new Map()
  const docs = []
  splitSentences(text, this).forEach(str => {
    let parsed = next.get(str) || cache.sentences.get(str)
    if (!parsed) {
      if (opts.verbose) {
        console.log(`parsing: '${str}'`)// eslint-disable-line no-console
      }
      parsed = this(str).document
    }
    next.set(str, parsed)
    // Clone each occurrence separately, including duplicate sentences.
    const copy = globalThis.structuredClone(parsed)
    copy.forEach(terms => docs.push(terms))
  })
  cache.sentences = next
  if (opts.verbose) {
    console.log(`${next.size} sentences in cache`)// eslint-disable-line no-console
  }
  return fromDocs(this, docs, true)
}

export default { lib: { keyPress } }
