import multiWord from './multi-word.js'
import singleWord from './single-word.js'

const compute = function (view) {
  const model = view.model
  view.docs.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      if (terms[i].tags.size === 0) {
        let found = null
        found = found || multiWord(terms, i, model)
        // lookup known words
        found = found || singleWord(terms, i, model)
      }
    }
  })
}
export default compute