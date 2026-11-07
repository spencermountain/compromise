import unTag from '../../../../../1-one/tag/methods/unTag.js'
import fastTag from '../_fastTag.js'
import { Adj, Adv, Ger, Val, Det, Prep, Conj, Pron, Poss, Vb, NN, Plur } from '../../../tagSet/_lib.js'

// adverbs that can also describe a noun
const describing = new Set(['still', 'only', 'very', 'further'])
// these can be a subject - 'this still helps'
const demonstrative = new Set(['this', 'that', 'these', 'those'])
// tags that can't be the thing being described
const notThing = [Adj, Adv, Ger, Val, Det, Prep, Conj, Pron, 'Negative']

// 'a still night' - between a determiner and its noun, it describes the noun
const attributive = function (terms, i, model) {
  const term = terms[i]
  const before = terms[i - 1]
  const after = terms[i + 1]
  if (!before || !after || !describing.has(term.normal) || demonstrative.has(before.normal)) {
    return
  }
  if (!before.tags.has(Det) && !before.tags.has(Poss)) {
    return
  }
  // the thing is a noun, an unknown word, or a noun-or-verb
  const form = after.switch || ''
  const isVerb = after.tags.has(Vb) && !form.includes(NN) && !form.includes(Plur)
  if (isVerb || notThing.some(tag => after.tags.has(tag))) {
    return
  }
  unTag([term], Adv, model.one.tagSet, '3-attributive')
  fastTag(term, Adj, '3-attributive')
}
export default attributive
