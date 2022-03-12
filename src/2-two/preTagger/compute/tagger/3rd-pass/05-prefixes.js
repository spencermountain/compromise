import fastTag from '../_fastTag.js'

// 'out lived' is a verb-phrase
// 'over booked' is too
// 'macro-nutrient', too
const doPrefix = function (terms, i, model) {
  let nextTerm = terms[i + 1]
  if (!nextTerm) {
    return
  }
  let { prefixes } = model.one
  let term = terms[i]

  // word like 'over'
  if (prefixes[term.normal] === true) {
    // 'over cooked'
    if (nextTerm.tags.has('Verb')) {
      fastTag(term, 'Verb', '3-[prefix]')
      fastTag(term, 'Prefix', '3-[prefix]')
    }
    // 'pseudo clean'
    if (nextTerm.tags.has('Adjective')) {
      fastTag(term, 'Adjective', '3-[prefix]')
      fastTag(term, 'Prefix', '3-[prefix]')
    }
  }

}
export default doPrefix