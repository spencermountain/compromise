import unTag from '../../../../../1-one/tag/methods/unTag.js'
import fastTag from '../_fastTag.js'
import { hasAny, toSet } from '../../../../_lib.js'
import { Adj, Adv, Ger, Val, Det, Prep, Conj, Pron, Poss, Vb, NN, Plur, Neg } from '../../../tagSet/_lib.js'
// the debug reason for every tag this pass sets
const reason = '3-attributive'

// adverbs that can also describe a noun
const describing = toSet('still only very further')
// these can be a subject - 'this still helps'
const demonstrative = toSet('this that these those')
// tags that can't be the thing being described
const notThing = [Adj, Adv, Ger, Val, Det, Prep, Conj, Pron, Neg]

// 'a still night' - between a determiner and its noun, it describes the noun
const attributive = function (terms, i, model) {
  const term = terms[i]
  const before = terms[i - 1]
  const after = terms[i + 1]
  if (!before || !after || !describing.has(term.normal) || demonstrative.has(before.normal)) {
    return
  }
  if (!hasAny(before, Det, Poss)) {
    return
  }
  // the thing is a noun, an unknown word, or a noun-or-verb
  const form = after.switch || ''
  const isVerb = after.tags.has(Vb) && !form.includes(NN) && !form.includes(Plur)
  if (isVerb || hasAny(after, ...notThing)) {
    return
  }
  unTag([term], Adv, model.one.tagSet, reason)
  fastTag(term, Adj, reason)
}
export default attributive
