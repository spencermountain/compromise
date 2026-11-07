import question from '../../verbs/api/conjugate/question.js'
import { firstGroup } from '../../verbs/api/conjugate/coordinate.js'

// convert the first verb, then any later verbs that should agree with it
const agree = (target, method, narrow) => s => {
  const inverted = question(s, target)
  if (inverted) {
    return inverted
  }
  let verbs = s.verbs()
  // translate the first verb, no-stress
  const first = firstGroup(verbs)
  // A passive participle does not make its auxiliary past tense.
  if (narrow && first.has('#Past') && !first.has('#Aux')) {
    return s
  }
  first[method]()

  // force agreement with any 2nd/3rd verbs:
  if (verbs.length > 1) {
    verbs = verbs.slice(first.length)
    // remove any sorta infinitive - 'to engage'
    verbs = verbs.filter((v) => !v.lookBehind('to$').found)
    // keep -ing verbs
    verbs = verbs.notIf('#Ger')
    if (narrow) {
      verbs = narrow(verbs, s)
    }
    // otherwise, I guess so?
    if (verbs.found) {
      verbs.verbs()[method]()
    }
  }
  return s
}

export default agree
