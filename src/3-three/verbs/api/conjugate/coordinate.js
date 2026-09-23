import parseVerb from '../parse/index.js'
import getGrammar from '../parse/grammar/index.js'
import readAuxiliary from '../parse/auxiliary.js'
import { getTense, isAreAm } from '../lib.js'

// Snapshot coordination before any edit changes tags or term positions. Only
// adjacent, compatible roots can inherit an auxiliary; a new subject, object,
// comma, sentence boundary, or explicit auxiliary starts an independent phrase.
const groups = function (verbs) {
  const entries = verbs.map(vb => {
    const parsed = parseVerb(vb)
    return { vb, parsed, root: vb.match(parsed.root).harden() }
  }, [])
  entries.forEach((entry, i) => {
    const previous = entries[i - 1]
    if (!previous || entry.parsed.auxiliary.found) return
    const head = previous.head || previous
    if (!head.parsed.auxiliary.found) return
    const info = getGrammar(head.vb, head.parsed)
    if (info.isInfinitive) return
    const chain = readAuxiliary(head.parsed, info.form)
    if ((!chain && info.form !== 'simple-future') || (chain && chain.prospective)) return
    head.chain = chain
    head.form = info.form
    const root = entry.parsed.root
    const headRoot = head.parsed.root
    let compatible = headRoot.has('#Infinitive') && root.has('#Infinitive')
    if (headRoot.has('(#PastTense|#Participle)')) compatible = root.has('(#PastTense|#Participle)')
    if (headRoot.has('#Gerund')) compatible = root.has('#Gerund')
    if (!compatible || previous.vb.has('@hasComma$')) return
    const next = previous.vb.growRight('(and|or) #Adverb+? #Verb+ #Particle?')
    if (next.match(entry.vb).wordCount() !== entry.vb.wordCount()) return
    entry.head = head
  })
  return entries
}

// Sentence converters traditionally handle the first phrase separately. Keep
// its shared-auxiliary dependents in that first conversion too.
export const firstGroup = function (verbs) {
  if (verbs.length < 2) return verbs
  const entries = groups(verbs)
  let count = 1
  while (entries[count] && entries[count].head === entries[0]) count += 1
  return verbs.slice(0, count)
}

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

const coordinate = function (verbs, target, convert) {
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
    const { toInfinitive, conjugate } = vb.methods.two.transform.verb
    const root = entry.parsed.root
    const infinitive = toInfinitive(root.text('normal'), vb.model, getTense(root))
    const forms = conjugate(infinitive, vb.model)
    const tense = entry.tense
    const word = tense === 'Infinitive' ? infinitive : forms[tense] || (tense === 'Participle' && forms.PastTense)
    if (word && word !== root.text('normal')) {
      entry.root.replaceWith(word)
      vb.fullSentence().compute(['tagger', 'chunks'])
    }
    return vb
  })
}
export default coordinate
