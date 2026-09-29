import { inflect } from './inflect.js'
import groups from './groups.js'
export { firstGroup } from './groups.js'
import question, { isInverted, questionSelection } from './question.js'
import { isAreAm } from '../lib.js'

const resultTense = function (head, target) {
  const { chain, parsed, form } = head
  if (target === 'infinitive') return 'Infinitive'
  if (target === 'gerund') return chain && chain.passive ? 'Participle' : 'Gerund'
  if (parsed.root.has('#Gerund')) return 'Gerund'
  if (target === 'participle') return 'Participle'
  if (chain && chain.passive) return 'Participle'
  if (chain && chain.perfect) {
    return target === 'present' && form === 'modal-past' ? 'Infinitive' : 'Participle'
  }
  if (chain && chain.modal) {
    return target === 'past' && form === 'modal-infinitive' && chain.finite !== 'can' ? 'Participle' : 'Infinitive'
  }
  if (target === 'future') return 'Infinitive'
  if (target === 'past') return 'PastTense'
  return isAreAm(head.vb, parsed) === 'is' ? 'PresentTense' : 'Infinitive'
}

const coordinateNormal = function (verbs, target, convert) {
  if (verbs.length < 2) return verbs.map(convert)
  const entries = groups(verbs)
  entries.forEach(entry => {
    if (entry.head) entry.tense = resultTense(entry.head, target)
  })
  return verbs.map((vb, i) => {
    const entry = entries[i]
    if (!entry.head) {
      return convert(vb)
    }
    const root = entry.parsed.root
    const word = inflect(root, entry.tense)
    if (word && word !== root.text('normal')) {
      entry.root.replaceWith(word)
      vb.fullSentence().compute(['tagger', 'chunks'])
    }
    return vb
  })
}
const coordinate = function (verbs, target, convert) {
  const sentences = verbs.fullSentence().settle()
  if (!sentences.some(s => isInverted(s))) return coordinateNormal(verbs, target, convert)
  return sentences.map(sentence => {
    const index = sentence.fullPointer[0][0]
    const selected = verbs.filter(vb => vb.fullPointer[0][0] === index)
    const required = questionSelection(sentence)
    if (!required) return coordinateNormal(selected, target, convert)
    const outside = selected.not(required)
    const inside = selected.not(outside).harden()
    const others = coordinateNormal(outside, target, convert)
    if (!inside.found) return others
    // Partial selections cannot reconstruct the whole question.
    if (required.terms().not(inside.terms()).not('#Negative').found) return inside.concat(others).settle()
    // Question reconstruction changes term IDs. Track other selected phrases
    // from the sentence end, since the unchanged trailing clauses keep their
    // lengths even when the main auxiliary chain grows or shrinks.
    const end = sentence.fullPointer[0][2]
    const trailing = others.fullPointer.map(ptr => [ptr[0], end - ptr[1], end - ptr[2]])
    const result = question(sentence, target)
    const newEnd = result.fullPointer[0][2]
    const remaining = result.update(trailing.map(ptr => [ptr[0], newEnd - ptr[1], newEnd - ptr[2]]))
    return questionSelection(result).concat(remaining).settle()
  })
}
export default coordinate
