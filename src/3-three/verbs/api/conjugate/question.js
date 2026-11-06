import { firstGroup } from './groups.js'
import { doDoes } from '../lib.js'

const methods = {
  past: 'toPastTense', present: 'toPresentTense', future: 'toFutureTense',
  participle: 'toPastParticiple', gerund: 'toGerund', infinitive: 'toInfinitive',
}
const auxiliary = /^(do|does|did|have|has|had|is|are|am|was|were|will|would|can|could|shall|should|may|might|must)$/
// Punctuation before the first word: '-What is it?', '"Did you?"'
const trimLead = str => str.replace(/^[^\p{L}\p{N}]+/u, '')
// These start a longer subject: 'your dog'
const possessive = /^(my|your|his|her|its|our|their)$/
// These only add or drop a 'not', and don't rebuild the question.
export const isPolar = target => target === 'negative' || target === 'positive'

const parseQuestion = function (sentence, target) {
  const text = trimLead(sentence.text())
  const wh = /^(?:(?:in|on|at|to|for|from|with|about|by)\s+)?(?:why|when|where|how|what|who|whom|which|whose)\b/i.test(text)
  if (!wh && !/^(?:do|does|did|have|has|had|is|are|am|was|were|will|would|can|could|shall|should|may|might|must|won|shan)(?:n['’]t)?\b/i.test(text)) return null
  const expanded = sentence.clone()
  expanded.contractions().expand()
  const terms = expanded.terms()
  const words = terms.map(t => trimLead(t.text('normal')), [])
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
  const pronoun = terms.eq(start).has('#Pronoun') && !possessive.test(words[start])
  const polar = isPolar(target)
  const asked = sentence.has('@hasQuestionMark$')
  const command = sentence.has('^#Imperative')
  // Without a '?', only 'is he happy' is clearly inverted. The rest could be commands,
  // clauses or fragments: 'Do the dishes now', 'When he is late, they walk', 'Had I known, ...'
  if (polar && !asked && (!pronoun || finite > 1 || command || sentence.has('@hasComma'))) {
    return null
  }
  let end = start
  // Pronouns and ordinary noun subjects, including coordinated names and
  // prepositional modifiers. Stop at the lexical verb/remaining auxiliaries.
  if (pronoun) {
    end += 1
  } else {
    if (terms.eq(end).has('#Preposition')) return null
    let noun = false
    for (; end < words.length; end += 1) {
      if (!terms.eq(end).has('(#Determiner|#Adjective|#Noun|#Preposition|#Conjunction)') || terms.eq(end).has('#Verb')) break
      if (noun && copula && (terms.eq(end).has('#Adjective') || /ing$/.test(words[end]))) break
      noun ||= terms.eq(end).has('#Noun') && !possessive.test(words[end])
    }
    if (!noun) return null
  }
  // Where does a negative go, when the subject seems to reach the end?
  if (polar && copula && end >= words.length) {
    // The wh-word can be the subject: 'Who is there?'
    if (/^(who|what|which)$/.test(words[finite - 1])) {
      return null
    }
    // Otherwise a phrase can be the predicate: 'Is Tom a doctor?', 'Is the book on the table?'
    const predicate = words.findIndex((word, i) => i > start && (possessive.test(word) || (word !== 'of' && terms.eq(i).has('(#Determiner|#Preposition)'))))
    if (!wh && predicate > -1) {
      // Leave an unclear subject to the ordinary path: 'Is this your dog?'
      if (!terms.slice(start, predicate).has('#Noun')) {
        return null
      }
      end = predicate
    }
  }
  // Adding a 'not' can go without a predicate: 'Did you?' -> 'Did you not?'
  const bare = polar && asked && !command && end >= words.length
  // Polite questions have a predicate past the 'please': 'Could you please leave?'
  const optional = copula || bare || (polar && words[end] === 'please')
  if (end === start || (end >= words.length && !optional)) return null
  if (!terms.eq(end).has('(#Verb|#Adverb|#Negative)') && !optional) return null
  return { terms, words, finite, start, end, frontNegative }
}

export const isInverted = (sentence, target) => Boolean(parseQuestion(sentence, target))

export const questionSelection = function (sentence, target) {
  const q = parseQuestion(sentence, target)
  if (!q) return null
  const offset = sentence.fullPointer[0][1]
  // These can sit outside the verb chunk: 'do the walls not really need', 'could you please leave'
  let end = q.end
  while (q.terms.eq(end).has('(#Negative|please)')) {
    end += 1
  }
  const at = offset + end
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

// Index of a negative in the main predicate. 'not only' tags its 'not' as an adverb.
const predicateNot = function (terms, end) {
  for (let i = end; terms.eq(i).has('(#Verb|#Adverb|#Negative|please)'); i += 1) {
    if (terms.eq(i).has('(#Negative|not)')) {
      return i
    }
  }
  return -1
}

// The auxiliary is already fronted, so 'not' just follows the subject.
const negate = function (sentence, { terms, end, frontNegative }) {
  if (frontNegative || predicateNot(terms, end) > -1) {
    return sentence
  }
  // Prepending keeps the subject's punctuation, unless nothing follows it.
  const all = sentence.terms()
  if (all.eq(end).found) {
    all.eq(end).prepend('not')
  } else {
    all.eq(end - 1).append('not')
  }
  return sentence.fullSentence().compute('chunks')
}

// The auxiliary stays fronted, so only the 'not' goes: 'Does he not walk?' -> 'Does he walk?'
const affirm = function (sentence, { terms, start, end, frontNegative }) {
  const not = frontNegative ? start - 1 : predicateNot(terms, end)
  if (not < 0) {
    return sentence
  }
  sentence.terms().eq(not).remove()
  return sentence.fullSentence().compute('chunks')
}

// Convert a declarative copy, then put only its finite auxiliary back before
// the subject. The copy uses the same world and existing conversion policies.
const question = function (sentence, target) {
  const q = parseQuestion(sentence, target)
  if (!q) return null
  if (target === 'negative') {
    return negate(sentence, q)
  }
  if (target === 'positive') {
    return affirm(sentence, q)
  }
  const { terms, words, finite, start, end, frontNegative } = q
  const subject = terms.slice(start, end).text()
  // replaceWith() puts the leading punctuation back
  const prefix = finite > 0 ? trimLead(terms.slice(0, finite).text()) : ''
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
  if (!prefix && /^[A-Z]/.test(trimLead(sentence.text()))) head = head[0].toUpperCase() + head.slice(1)
  const result = [prefix, head, subject, rest.text()].filter(Boolean).join(' ')
  // Partial text can lose or mangle the ending: '?"'
  const ending = sentence.docs.at(-1).at(-1).post
  const changed = sentence.replaceWith(result).fullSentence().compute(['contractions', 'tagger', 'contractionTwo', 'chunks'])
  changed.docs.at(-1).at(-1).post = ending
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
