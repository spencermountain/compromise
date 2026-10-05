import debug from './debug.js'

/** log the decision-making to console */
const verbose = function (set) {
  const env = globalThis.process?.env ?? globalThis.env ?? {} //use window, in browser
  debug.tags = set === 'tagger' || set === true
  env.DEBUG_TAGS = debug.tags ? true : ''
  env.DEBUG_MATCH = set === 'match' || set === true ? true : ''
  env.DEBUG_CHUNKS = set === 'chunker' || set === true ? true : ''
  return this
}

export { verbose }
