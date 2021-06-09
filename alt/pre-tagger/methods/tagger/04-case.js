const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/
const hasNumber = /[0-9]/

// if it's a unknown titlecase word, it's a propernoun
const checkCase = function (document) {
  document.forEach(terms => {
    // skip first word of sentence
    for (let i = 1; i < terms.length; i += 1) {
      if (terms[i].tags.size === 0) {
        let str = terms[i].text //need case info
        if (titleCase.test(str) === true && hasNumber.test(str) === false && terms[i].tags.has('Date') === false) {
          terms[i].tags.add('ProperNoun')
        }
      }
    }
  })
}
module.exports = checkCase
