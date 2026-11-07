import { Conj, Prep, Adv, Vb, NN } from '../../../2-two/preTagger/tagSet/_lib.js'
// ensure everything has a chunk
const fallback = function (document) {
  for (let n = 0; n < document.length; n += 1) {
    for (let t = 0; t < document[n].length; t += 1) {
      const term = document[n][t]
      if (term.chunk === undefined) {
        // conjunctions stand alone
        if (term.tags.has(Conj)) {
          term.chunk = 'Pivot'
        } else if (term.tags.has(Prep)) {
          term.chunk = 'Pivot'
        } else if (term.tags.has(Adv)) {
          term.chunk = Vb
        }
        // just take the chunk on the right?
        // else if (document[n][t + 1] && document[n][t + 1].chunk) {
        //   term.chunk = document[n][t + 1].chunk
        // }
        // // or take the chunk on the left
        // else if (document[n][t - 1] && document[n][t - 1].chunk) {
        //   term.chunk = document[n][t - 1].chunk
        else {
          //  ¯\_(ツ)_/¯
          term.chunk = NN
        }
      }
    }
  }
}
export default fallback
