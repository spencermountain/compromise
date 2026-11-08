import debug from './debug/debug.js'
import matchDebug from './debug/match-debug.js'
import hooksDebug from './debug/hooks-debug.js'

let restoreMatch

/** log the decision-making to console */
const verbose = function (set = true, options = {}) {
  restoreMatch?.()
  restoreMatch = undefined
  if (set === 'match' || set === true) {
    restoreMatch = matchDebug(this._world, options)
  }
  debug.hooks = set === 'hooks' || set === true ? hooksDebug(set === true) : undefined
  debug.word = options.word?.toLowerCase()
  debug.contractions = set === 'contractions' || set === true
  debug.rule = undefined
  debug.tags = set === 'tagger' || set === true
  debug.spec = set === 'spec' || set === true
  return this
}

export { verbose }
