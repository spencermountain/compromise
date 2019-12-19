const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/
const hasNumber = /[0-9]/

/** look for any grammar signals based on capital/lowercase */
const checkCase = function(terms, world) {
  terms.forEach((term, i) => {
    //is it a titlecased word?
    if (titleCase.test(term.text) === true && hasNumber.test(term.text) === false) {
      // tag it as titlecase, if possible
      // if (i !== 0) {
      //   term.tag('TitleCase', 'case', world)
      // } else if (term.tags.Person || term.tags.Organization || term.tags.Place) {
      //   term.tag('TitleCase', 'case-person', world)
      // }
      // can we call it a noun?
      if (i !== 0) {
        //sure!
        term.tag('ProperNoun', 'case-noun', world)
      }
    }
  })
}
module.exports = checkCase
