import metaphone from './metaphone.js'

const soundsLike = function (view) {
  view.docs.forEach(terms => {
    terms.forEach(term => {
      term.soundsLike = metaphone(term.normal || term.text)
    })
  })
}

export default soundsLike