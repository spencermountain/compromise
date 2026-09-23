import { firstGroup } from './groups.js'
import { doDoes } from '../lib.js'

const methods = {
  past: 'toPastTense', present: 'toPresentTense', future: 'toFutureTense',
  participle: 'toPastParticiple', gerund: 'toGerund', infinitive: 'toInfinitive',
}
const auxiliary = /^(do|does|did|have|has|had|is|are|am|was|were|will|would|can|could|shall|should|may|might|must)$/

const parseQuestion = function (sentence) {
  const wh = /^(?:(?:in|on|at|to|for|from|with|about|by)\s+)?(?:why|when|where|how|what|who|whom|which|whose)\b/i.test(sentence.text())
  if (!wh && !/^(?:do|does|did|have|has|had|is|are|am|was|were|will|would|can|could|shall|should|may|might|must|won|shan)(?:n['’]t)?\b/i.test(sentence.text())) return null
  const expanded = sentence.clone()
  expanded.contractions().expand()
  const terms = expanded.terms()
  const words = terms.map(t => t.text('normal'), [])
  // An object wh-phrase may contain several words ('which books', 'in which
  // city'). Its finite auxiliary still precedes a separate subject. Subject
  // wh-phrases fail the subject check below and stay on the ordinary path.
  const finite = wh ? words.findIndex((word, i) => i > 0 && auxiliary.test(word)) : 0
  if (finite < 0) return null
  if (!auxiliary.test(words[finite]) || (words[finite] === 'will' && terms.eq(finite).has('#Person'))) return null
  const copula = /^(is|are|am|was|were)$/.test(words[finite])
  let start = finite + 1
  const frontNegative = words[start] === 'not'
  if (frontNegative) start += 1
  let end = start
  // Pronouns and ordinary noun subjects, including coordinated names and
  // prepositional modifiers. Stop at the lexical verb/remaining auxiliaries.
  if (terms.eq(end).has('#Pronoun')) {
    end += 1
  } else {
    if (terms.eq(end).has('#Preposition')) return null
    let noun = false
    for (; end < words.length; end += 1) {
      if (!terms.eq(end).has('(#Determiner|#Adjective|#Noun|#Preposition|#Conjunction)') || terms.eq(end).has('#Verb')) break
      if (noun && copula && (terms.eq(end).has('#Adjective') || /ing$/.test(words[end]))) break
      noun = noun || terms.eq(end).has('#Noun')
    }
    if (!noun) return null
  }
  if (end === start || (end >= words.length && !copula)) return null
  if (!terms.eq(end).has('(#Verb|#Adverb|#Negative)') && !copula) return null
  return { terms, words, finite, start, end, frontNegative }
}

export const isInverted = sentence => Boolean(parseQuestion(sentence))

export const questionSelection = function (sentence) {
  const q = parseQuestion(sentence)
  if (!q) return null
  const offset = sentence.fullPointer[0][1]
  const at = offset + q.end
  let predicate = sentence.verbs().filter(vb => vb.fullPointer.some(ptr => ptr[1] <= at && ptr[2] > at))
  // Include directly coordinated dependents, but never a new subject/clause.
  for (let i = 0; i < q.words.length && predicate.found; i += 1) {
    const chain = predicate.growRight('(#Adverb|#Negative)+? #Verb+ #Particle?')
    const next = chain.growRight('(and|or) #Adverb+? #Verb+ #Particle?')
    if (next.wordCount() === predicate.wordCount()) break
    predicate = next
  }
  return sentence.terms().slice(q.finite, q.start).concat(predicate.not('#Conjunction')).settle()
}

// Convert a declarative copy, then put only its finite auxiliary back before
// the subject. The copy uses the same world and existing conversion policies.
const question = function (sentence, target) {
  const q = parseQuestion(sentence)
  if (!q) return null
  const { terms, words, finite, start, end, frontNegative } = q
  const subject = terms.slice(start, end).text()
  const prefix = finite > 0 ? terms.slice(0, finite).text() : ''
  const tail = terms.slice(end).text()
  const negative = frontNegative ? ' not' : ''
  const source = subject + ' ' + words[finite] + negative + ' ' + tail
  let work = sentence.fromText(source).compute(['tagger', 'chunks'])
  // Subject-first order keeps the scratch copy on the ordinary conversion path.
  firstGroup(work.verbs())[methods[target]]()
  if (work.text('normal') === sentence.fromText(source).text('normal')) return sentence
  work = sentence.fromText(work.text()).compute(['tagger', 'chunks'])
  const subjectLength = end - start
  let rest = work.terms().slice(subjectLength)
  let head = rest.eq(0).text('normal')
  if (!auxiliary.test(head)) {
    // Simple lexical questions require do-support, even in positive forms.
    head = target === 'past' ? 'did' : doDoes(work.verbs(0))
    firstGroup(work.verbs()).toInfinitive()
    rest = work.terms().slice(subjectLength)
  } else {
    rest = rest.slice(1)
  }
  const contracted = sentence.has('@hasContraction') && frontNegative
  const not = rest.match('not').eq(0)
  if (contracted && not.found) {
    if (head !== 'am') {
      const special = { will: "won't", can: "can't", shall: "shan't" }
      head = special[head] || head + "n't"
      if (sentence.text().includes('’')) head = head.replace("'", '’')
      rest = rest.not(not)
    }
  }
  if (!prefix && /^[A-Z]/.test(sentence.text())) head = head[0].toUpperCase() + head.slice(1)
  const result = [prefix, head, subject, rest.text()].filter(Boolean).join(' ')
  const changed = sentence.replaceWith(result).fullSentence().compute(['contractions', 'tagger', 'contractionTwo', 'chunks'])
  // The wh-prefix is unchanged. Preserve its analysis too, so a reconstructed
  // 'Which books ...' cannot acquire a spurious verb tag on the next conversion.
  for (let i = 0; i < finite; i += 1) {
    const term = changed.terms().eq(i)
    term.unTag([...term.termList()[0].tags])
    term.tag([...terms.eq(i).termList()[0].tags])
  }
  // A leading 'Had' can otherwise be tagged as a conditional marker. Here we
  // know it is the finite auxiliary that was just moved into question position.
  changed.terms().eq(finite).tag('Auxiliary')
  return changed.compute('chunks')
}
export default question
