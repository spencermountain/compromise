const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/
const hasNumber = /[0-9]/

/** look for any grammar signals based on capital/lowercase */
const checkCase = function (doc) {
  let world = doc.world
  doc.list.forEach(p => {
    let terms = p.terms()
    for (let i = 1; i < terms.length; i++) {
      const term = terms[i]
      if (titleCase.test(term.text) === true && hasNumber.test(term.text) === false && term.tags.Date === undefined) {
        term.tag('ProperNoun', 'titlecase-noun', world)
      }
    }
  })
}
module.exports = checkCase
