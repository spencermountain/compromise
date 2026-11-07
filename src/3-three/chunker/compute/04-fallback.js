import { Conj, Prep, Adv, Vb, NN } from '../../../2-two/preTagger/tagSet/_lib.js'
import { hasAny } from '../../../2-two/_lib.js'
import { eachTerm, Pivot } from './_lib.js'

// ensure everything has a chunk
const fallback = function (document) {
  eachTerm(document, term => {
    if (term.chunk !== undefined) {
      return
    }
    // conjunctions and prepositions stand alone
    if (hasAny(term, Conj, Prep)) {
      term.chunk = Pivot
    } else if (term.tags.has(Adv)) {
      term.chunk = Vb
    } else {
      //  ¯\_(ツ)_/¯
      term.chunk = NN
    }
  })
}
export default fallback
