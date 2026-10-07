import debug from './debug.js'

// Log decisions before splicing replaces the original term.
const contractionDebug = (term, expansion, reason, index = term.index) => {
  if (!debug.contractions || (debug.word && debug.word !== (term.normal || term.text).toLowerCase())) {
    return
  }
  const event = {
    type: 'contractions',
    text: term.text,
    index: index?.slice(),
    expansion,
    reason,
  }
  if (debug.emit) {
    debug.emit(event)
    return
  }
  debug.rule = undefined
  const result = expansion ? expansion.join(' ') : 'possessive (kept)'
  console.log(`${debug.prefix || '   '}${event.text} → ${result} (${reason})`) // eslint-disable-line no-console
}

export default contractionDebug
