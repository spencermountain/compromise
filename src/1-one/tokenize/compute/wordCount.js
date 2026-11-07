import eachTerm from './_lib.js'

const wordCount = function (view) {
  let n = 0
  eachTerm(view.docs, term => {
    //skip implicit words
    if (term.normal !== '') {
      n += 1
      term.wordCount = n
    }
  })
}
export default wordCount
