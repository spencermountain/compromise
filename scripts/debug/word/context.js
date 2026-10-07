import debug from '../../../src/API/debug.js'

// Keep structured capture in the inspector, outside the runtime verbose API.
const context = (nlp, word, sentence) => {
  const events = []
  const log = debug.log
  let doc
  try {
    nlp.verbose('tagger', { word })
    debug.log = (term, previous, reason = '') => {
      if (!previous) {
        return
      }
      const added = [...term.tags].filter(tag => !previous.includes(tag))
      const removed = previous.filter(tag => !term.tags.has(tag))
      if (added.length || removed.length) {
        events.push({
          text: term.text || term.implicit || '',
          normal: term.normal,
          index: term.index?.slice(),
          reason,
          added,
          removed,
        })
      }
    }
    doc = nlp(sentence)
  } finally {
    debug.log = log
    nlp.verbose(false)
  }
  return { doc, events }
}

export default context
