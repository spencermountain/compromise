import debug from './debug.js'
import { yellow } from './_color.js'

// Log decisions before splicing replaces the original term.
const contractionDebug = (term, expansion) => {
  if (!debug.contractions || (debug.word && debug.word !== (term.normal || term.text).toLowerCase())) {
    return
  }
  debug.rule = undefined
  const result = expansion ? '[' + expansion.map(word => yellow(`'${word}'`)).join(', ') + ']' : 'possessive (kept)'
  console.log(`${debug.prefix || '   '}${yellow(JSON.stringify(term.text))} →  ${result}`) // eslint-disable-line no-console
}

export default contractionDebug
