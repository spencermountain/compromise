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
      term.tags.clear()
      term.tags.add('Verb')
      term.tags.add('Prefix')
    }
    // 'pseudo clean'
    if (nextTerm.tags.has('Adjective')) {
      term.tags.clear()
      term.tags.add('Adjective')
      term.tags.add('Prefix')
    }
  }

}
export default doPrefix