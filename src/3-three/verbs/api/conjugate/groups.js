import parseVerb from '../parse/index.js'
import getGrammar from '../parse/grammar/index.js'
import readAuxiliary from '../parse/auxiliary.js'

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

export default groups
