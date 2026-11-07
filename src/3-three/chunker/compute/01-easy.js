import { NN, Vb, Det, Val, QW } from '../../../2-two/preTagger/tagSet/_lib.js'
const byWord = {
  this: NN,
  then: 'Pivot'
}

// simply chunk Nouns as <Noun>
const easyMode = function (document) {
  for (let n = 0; n < document.length; n += 1) {
    for (let t = 0; t < document[n].length; t += 1) {
      const term = document[n][t]

      if (Object.hasOwn(byWord, term.normal) === true) {
        term.chunk = byWord[term.normal]
        continue
      }
      if (term.tags.has(Vb)) {
        term.chunk = Vb
        continue
      }
      if (term.tags.has(NN) || term.tags.has(Det)) {
        term.chunk = NN
        continue
      }
      // 100 cats
      if (term.tags.has(Val)) {
        term.chunk = NN
        continue
      }
      //
      if (term.tags.has(QW)) {
        term.chunk = 'Pivot'
        continue
      }

    }
  }
}
export default easyMode
