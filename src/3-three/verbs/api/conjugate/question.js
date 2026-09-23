import { firstGroup } from './coordinate.js'
import { doDoes } from '../lib.js'

const methods = {
  past: 'toPastTense', present: 'toPresentTense', future: 'toFutureTense',
  participle: 'toPastParticiple', gerund: 'toGerund', infinitive: 'toInfinitive',
}
const auxiliary = /^(do|does|did|have|has|had|is|are|am|was|were|will|would|can|could|shall|should|may|might|must)$/

const parseQuestion = function (sentence) {
  if (!/^(?:(?:why|when|where|how|what|who|whom|which)\s+(?:(?:often|long|much|many)\s+)?)?(?:do|does|did|have|has|had|is|are|am|was|were|will|would|can|could|shall|should|may|might|must|won|shan)(?:n['’]t)?\b/i.test(sentence.text())) return null
  const expanded = sentence.clone()
  expanded.contractions().expand()
  const terms = expanded.terms()
  const words = terms.map(t => t.text('normal'), [])
  let finite = 0
  if (/^(why|when|where|how|what|who|whom|which)$/.test(words[0])) finite = 1
  if (words[0] === 'how' && /^(often|long|much|many)$/.test(words[1])) finite = 2
  if (!auxiliary.test(words[finite]) || (words[finite] === 'will' && terms.eq(finite).has('#Person'))) return null
  let start = finite + 1
  const frontNegative = words[start] === 'not'
  if (frontNegative) start += 1
  let end = start
  // Pronouns and ordinary noun subjects, including coordinated names and
  // prepositional modifiers. Stop at the lexical verb/remaining auxiliaries.
  if (terms.eq(end).has('#Pronoun')) {
    end += 1
  } else {
    let noun = false
    while (end < words.length && terms.eq(end).has('(#Determiner|#Adjective|#Noun|#Preposition|#Conjunction)') && !terms.eq(end).has('#Verb')) {
      if (noun && /^(is|are|am|was|were)$/.test(words[finite]) && (terms.eq(end).has('#Adjective') || /ing$/.test(words[end]))) break
      noun = noun || terms.eq(end).has('#Noun')
      end += 1
    }
  }
  if (end === start || (end >= words.length && !/^(is|are|am|was|were)$/.test(words[finite]))) return null
  if (!terms.eq(end).has('(#Verb|#Adverb|#Negative)') && !/^(is|are|am|was|were)$/.test(words[finite])) return null
  return { expanded, terms, words, finite, start, end, frontNegative }
}

export const isInverted = sentence => Boolean(parseQuestion(sentence))

// Convert a declarative copy, then put only its finite auxiliary back before
// the subject. The copy uses the same world and existing conversion policies.
const question = function (sentence, target, selection) {
  const q = parseQuestion(sentence)
  if (!q) return null
  if (selection && selection.wordCount() < sentence.verbs().wordCount()) return selection
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
  if (contracted && rest.eq(0).has('not')) {
    if (head !== 'am') {
      const special = { will: "won't", can: "can't", shall: "shan't" }
      head = special[head] || head + "n't"
      if (sentence.text().includes('’')) head = head.replace("'", '’')
      rest = rest.slice(1)
    }
  }
  if (!prefix && /^[A-Z]/.test(sentence.text())) head = head[0].toUpperCase() + head.slice(1)
  const result = [prefix, head, subject, rest.text()].filter(Boolean).join(' ')
  const changed = sentence.replaceWith(result).compute(['contractions', 'tagger', 'contractionTwo', 'chunks'])
  // A leading 'Had' can otherwise be tagged as a conditional marker. Here we
  // know it is the finite auxiliary that was just moved into question position.
  changed.terms().eq(finite).tag('Auxiliary')
  return changed.compute('chunks')
}
export default question
