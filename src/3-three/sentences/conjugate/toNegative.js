import groups from '../../verbs/api/conjugate/groups.js'
import { inflect } from '../../verbs/api/conjugate/inflect.js'
import question from '../../verbs/api/conjugate/question.js'
import { doTense } from '../../verbs/api/lib.js'
import { Inf } from '../../../2-two/preTagger/tagSet/_lib.js'

const mainVerbs = (s, parsed) => {
  if (!parsed.verb.found) {
    return s.none().verbs()
  }
  return parsed.verb.growRight('.*').verbs()
}

const toNegative = function (s, parsed) {
  const inverted = question(s, 'negative')
  if (inverted) {
    return inverted
  }
  const entries = groups(mainVerbs(s, parsed), true)
  const head = entries[0]
  if (!head) {
    return s
  }
  // Shared do-support takes infinitives throughout the coordinated group.
  if (!head.parsed.auxiliary.found && !head.parsed.negative.found) {
    entries.forEach(entry => {
      if (entry.head === head) {
        entry.root.replaceWith(inflect(entry.parsed.root, Inf)).tag(Inf)
      }
    })
  }
  head.vb.toNegative()
  return s
}
const toPositive = function (s, parsed) {
  const inverted = question(s, 'positive')
  if (inverted) {
    return inverted
  }
  const entries = groups(mainVerbs(s, parsed), true)
  const head = entries[0]
  if (!head) {
    return s
  }
  const tense = doTense(head.parsed)
  if (tense) {
    entries.forEach(entry => {
      if (entry.head === head) {
        entry.root.replaceWith(inflect(entry.parsed.root, tense)).tag(tense)
      }
    })
  }
  head.vb.toPositive()
  s.compute('chunks')
  return s
}
export { toNegative, toPositive }
