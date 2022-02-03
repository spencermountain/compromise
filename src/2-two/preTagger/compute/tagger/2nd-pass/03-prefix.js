import fastTag from '../_fastTag.js'

const prefixes = /^(anti|re|un|non|extra|inter|intra|over)([a-z-]{3})/

// only allow prefixes on adjectives, verbs
const allowed = {
  Adjective: true,
  Verb: true,
  PresentTense: true,
  Infinitive: true,
  PastTense: true,
}

// give 'overwork' the same tag as 'work'
const checkPrefix = function (terms, i, model) {
  let term = terms[i]
  // if (prefixes.test(term.normal) === true) {
  //   let root = term.normal.replace(prefixes, '$2')
  //   root = root.replace(/^-/, '')
  //   if (model.one.lexicon.hasOwnProperty(root) === true) {
  //     let tag = model.one.lexicon[root]
  //     console.log(term.normal, root, tag)
  //     if (allowed[tag] === true) {
  //       fastTag(term, tag, '2-prefix')
  //       term.confidence = 0.6
  //       return true
  //     }
  //   }
  // }
  return null
}
export default checkPrefix
