import debug from './debug.js'
import matchDebug from './match-debug.js'
import hooksDebug from './hooks-debug.js'

let restoreMatch

/** log the decision-making to console */
const verbose = function (set = true, options = {}) {
  restoreMatch?.()
  restoreMatch = undefined
  if (set === 'match' || set === true) {
    restoreMatch = matchDebug(this._world, options)
  }
  const env = globalThis.process?.env ?? globalThis.env ?? {} //use window, in browser
  debug.hooks = set === 'hooks' || set === true ? hooksDebug(set === true) : undefined
  debug.word = options.word?.toLowerCase()
  debug.contractions = set === 'contractions' || set === true
  debug.rule = undefined
  debug.tags = set === 'tagger' || set === true
  env.DEBUG_TAGS = debug.tags ? true : ''
  env.DEBUG_MATCH = set === 'match' || set === true ? true : ''
  return this
}

export { verbose }
