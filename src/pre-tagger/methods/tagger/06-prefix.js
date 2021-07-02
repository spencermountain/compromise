import setTag from './_setTag.js'
const prefixes = /^(anti|re|un|non|extra|inter|intra|over)([a-z-]{3})/

// give 'overwork' the same tag as 'work'
const checkPrefix = function (terms, model) {
  terms.forEach(term => {
    if (term.tags.size === 0 && prefixes.test(term.normal)) {
      let root = term.normal.replace(prefixes, '$2')
      if (model.lexicon.hasOwnProperty(root) === true) {
        setTag(term, model.lexicon[root], 'prefix')
      }
    }
  })
}
export default checkPrefix
