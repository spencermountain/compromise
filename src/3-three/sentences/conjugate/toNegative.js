import groups from '../../verbs/api/conjugate/groups.js'
import { inflect } from '../../verbs/api/conjugate/inflect.js'

const mainVerbs = (s, parsed) => {
  if (!parsed.verb.found) {
    return s.none().verbs()
  }
  return parsed.verb.growRight('.*').verbs()
}

const toNegative = function (s, parsed) {
  const entries = groups(mainVerbs(s, parsed), true)
  const head = entries[0]
  if (!head) {
    return s
  }
  // Shared do-support takes infinitives throughout the coordinated group.
  if (!head.parsed.auxiliary.found && !head.parsed.negative.found) {
    entries.forEach(entry => {
      if (entry.head === head) {
        entry.root.replaceWith(inflect(entry.parsed.root, 'Infinitive')).tag('Infinitive')
      }
    })
  }
  head.vb.toNegative()
  // Include inserted terms outside the original verb selection.
  s.compute('chunks')
  return s
}
const toPositive = function (s, parsed) {
  const entries = groups(mainVerbs(s, parsed), true)
  const head = entries[0]
  if (!head) {
    return s
  }
  const { auxiliary, negative } = head.parsed
  if (negative.found && auxiliary.has('^(does|did)$')) {
    const tense = auxiliary.has('did') ? 'PastTense' : 'PresentTense'
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
