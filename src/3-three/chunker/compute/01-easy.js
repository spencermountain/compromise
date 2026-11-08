import { NN, Vb, Det, Val, QW } from '../../../2-two/preTagger/tagSet/_lib.js'
import Pivot from './_lib.js'
import eachTerm from '../../../1-one/tokenize/compute/_lib.js'
const byWord = {
  this: NN,
  then: Pivot
}
// the first tag found wins - '100 cats' is a noun
const byTag = [[Vb, Vb], [NN, NN], [Det, NN], [Val, NN], [QW, Pivot]]

// simply chunk Nouns as <Noun>
const easyMode = function (document) {
  eachTerm(document, term => {
    if (Object.hasOwn(byWord, term.normal)) {
      term.chunk = byWord[term.normal]
      return
    }
    const found = byTag.find(a => term.tags.has(a[0]))
    if (found) {
      term.chunk = found[1]
    }
  })
}
export default easyMode
