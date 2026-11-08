import eachTerm from './_lib.js'

// cheat- add the document's pointer to the terms
const index = function (view) {
  eachTerm(view.document, (term, terms, t, n) => {
    term.index = [n, t]
  })
}
export default index
