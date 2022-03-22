import getSyllables from './syllables.js'

// const defaultObj = { normal: true, text: true, terms: false }

const syllables = function (view) {
  view.docs.forEach(terms => {
    terms.forEach(term => {
      term.syllables = getSyllables(term.normal || term.text)
    })
  })
}

export default syllables
