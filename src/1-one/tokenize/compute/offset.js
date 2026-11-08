import eachTerm from './_lib.js'

// get all character startings in doc
const offset = function (view) {
  let elapsed = 0
  let index = 0
  //start from the actual-top
  eachTerm(view.document, term => {
    term.offset = {
      index: index,
      start: elapsed + term.pre.length,
      length: term.text.length,
    }
    elapsed += term.pre.length + term.text.length + term.post.length
    index += 1
  })
}
export default offset
