import { hasAny } from '../../_lib.js'
import { Det, Pron, Poss, Vb, Adv } from '../../preTagger/tagSet/_lib.js'
// 'i wanna pickle' is [want, pickle], not [want, to, pickle]
const hasObject = term => term && hasAny(term, Det, Pron, Poss)

const wannaNoun = function (terms, i) {
  if (terms[i].normal !== 'wanna') {
    return false
  }
  const to = terms[i + 1]
  const next = terms[i + 2]
  if (!to || to.implicit !== 'to' || !next) {
    return false
  }
  if (hasAny(next, Vb, Adv)) {
    return false
  }
  // 'wanna pickle the beets' is still a verb, before its object
  if (hasObject(terms[i + 3])) {
    return false
  }
  terms[i].post = to.post
  terms.splice(i + 1, 1)
  return true
}
export default wannaNoun
