import splitTerm from './split/index.js'

// const defaultObj = { normal: true, text: true, terms: false }

const syllables = function (view) {
  view.docs.forEach(terms => {
    terms.forEach(term => {
      term.syllables = splitTerm(term.normal || term.text)
    })
  })
}

export default syllables
