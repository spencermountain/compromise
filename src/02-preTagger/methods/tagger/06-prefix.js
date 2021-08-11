import setTag from './_setTag.js'
const prefixes = /^(anti|re|un|non|extra|inter|intra|over)([a-z-]{3})/

// give 'overwork' the same tag as 'work'
const checkPrefix = function (term, model) {
  if (prefixes.test(term.normal) === true) {
    let root = term.normal.replace(prefixes, '$2')
    root = root.replace(/^-/, '')
    if (model.two.lexicon.hasOwnProperty(root) === true) {
      setTag(term, model.two.lexicon[root], 'prefix')
      return true
    }
  }
  return null
}
export default checkPrefix
