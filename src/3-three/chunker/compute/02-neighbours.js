import { Adj, Cop, Det, NN, Adv, Vb, Neg } from '../../../2-two/preTagger/tagSet/_lib.js'
import { hasAny } from '../../../2-two/_lib.js'
import eachTerm from '../../../1-one/tokenize/compute/_lib.js'

// [neighbour offset, its tag, our chunk] - the first match wins
// 'is cool' vs 'the cool dog'
const adjRules = [[-1, Cop, Adj], [-1, Det, NN], [1, NN, NN]]
// 'really swimming' vs 'really cool'
const advRules = [[-1, Adj, Adj], [-1, Vb, Vb], [1, Adj, Adj], [1, Vb, Vb]]

// chunk by the term on either side
const byNeighbour = function (document) {
  eachTerm(document, (term, terms, t) => {
    if (term.chunk) {
      return
    }
    let rules = null
    if (term.tags.has(Adj)) {
      rules = adjRules
    } else if (hasAny(term, Adv, Neg)) {
      rules = advRules
    }
    if (!rules) {
      return
    }
    const found = rules.find(([side, tag]) => terms[t + side] && terms[t + side].tags.has(tag))
    if (found) {
      term.chunk = found[2]
    }
  })
}
export default byNeighbour
