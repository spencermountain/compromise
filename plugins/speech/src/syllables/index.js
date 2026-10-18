import splitTerm from './split/index.js'

// Store syllables on each term; the public API collects them by sentence.
const syllables = function (view, options = {}) {
  view.docs.forEach(terms => {
    terms.forEach(term => {
      term.syllables = splitTerm(term, options)
    })
  })
}

export default syllables
