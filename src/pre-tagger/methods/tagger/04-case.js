import setTag from './_setTag.js'

const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/
const hasNumber = /[0-9]/

// if it's a unknown titlecase word, it's a propernoun
const checkCase = function (term, i) {
  // skip first word of sentence
  if (i === 0) {
    return null
  }
  if (term.tags.size === 0) {
    let str = term.text //need case info
    if (titleCase.test(str) === true && hasNumber.test(str) === false && term.tags.has('Date') === false) {
      setTag(term, 'ProperNoun', 'titlecase')
      return true
    }
  }
  return null
}
export default checkCase
