import splitTerm from './split/index.js'

// Store syllables on each term; the public API collects them by sentence.
const syllables = function (view) {
  view.docs.forEach(terms => {
    terms.forEach(term => {
      term.syllables = splitTerm(term)
    })
  })
}

export default syllables
