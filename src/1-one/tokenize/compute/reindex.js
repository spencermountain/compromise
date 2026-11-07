import eachTerm from './_lib.js'

// cheat- add the document's pointer to the terms
const index = function (view) {
  eachTerm(view.document, (term, n, i) => {
    term.index = [n, i]
  })
}
export default index
