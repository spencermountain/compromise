import { Adj, Cop, Det, NN, Adv, Vb } from '../../../2-two/preTagger/tagSet/_lib.js'
// simply chunk Nouns as <Noun>
const byNeighbour = function (document) {
  for (let n = 0; n < document.length; n += 1) {
    for (let t = 0; t < document[n].length; t += 1) {
      const term = document[n][t]
      if (term.chunk) {
        continue
      }
      // based on next-term
      const onRight = document[n][t + 1]
      // based on last-term
      const onLeft = document[n][t - 1]

      //'is cool' vs 'the cool dog'
      if (term.tags.has(Adj)) {
        // 'is cool'
        if (onLeft && onLeft.tags.has(Cop)) {
          term.chunk = Adj
          continue
        }
        // 'the cool'
        if (onLeft && onLeft.tags.has(Det)) {
          term.chunk = NN
          continue
        }
        // 'cool dog'
        if (onRight && onRight.tags.has(NN)) {
          term.chunk = NN
          continue
        }
        continue
      }
      // 'really swimming' vs 'really cool'
      if (term.tags.has(Adv) || term.tags.has('Negative')) {
        if (onLeft && onLeft.tags.has(Adj)) {
          term.chunk = Adj
          continue
        }
        if (onLeft && onLeft.tags.has(Vb)) {
          term.chunk = Vb
          continue
        }

        if (onRight && onRight.tags.has(Adj)) {
          term.chunk = Adj
          continue
        }
        if (onRight && onRight.tags.has(Vb)) {
          term.chunk = Vb
          continue
        }
      }
    }
  }
}
export default byNeighbour
