import fastTag from '../_fastTag.js'
import findAffix from '../../../methods/_lib.js'
// const prefixes = /^(anti|re|un|non|extra|inter|intra|over)([a-z-]{3})/

//sweep-through all prefixes
const prefixLoop = function (str = '', prefixes = []) {
  const prefix = findAffix(str, prefixes, Math.min(str.length - 3, 7), 3, true)
  if (prefix === null) {
    return null
  }
  return prefixes[prefix.length][prefix]
}

// give 'overwork' the same tag as 'work'
const checkPrefix = function (terms, i, model) {
  const term = terms[i]
  if (term.tags.size === 0) {
    const tag = prefixLoop(term.normal, model.two.prefixPatterns)
    if (tag !== null) {
      // console.log(term.normal, '->', tag)
      fastTag(term, tag, '2-prefix')
      term.confidence = 0.5
      return true
    }
  }
  return null
}
export default checkPrefix
