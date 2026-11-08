import { firstGroup } from './groups.js'
import { doDoes } from '../lib.js'
import { Vb, Aux } from '../../../../2-two/preTagger/tagSet/_lib.js'

const methods = {
  past: 'toPastTense', present: 'toPresentTense', future: 'toFutureTense',
  participle: 'toPastParticiple', gerund: 'toGerund', infinitive: 'toInfinitive',
}
// Partial views trim their outer punctuation by default
const keepPunct = { keepEndPunct: true }
const modals = 'will|would|can|could|shall|should|may|might|must'
const auxWords = 'do|does|did|have|has|had|is|are|am|was|were|' + modals
// These are followed by a bare verb, the same as do-support
const bareVerb = RegExp(`^(do|does|did|${modals})$`)
const subjectPronoun = /^(i|you|he|she|it|we|they)$/
const auxiliary = RegExp(`^(${auxWords})$`)
const doHave = /^(do|have)$/
const tagged = ['id', 'tagger', 'chunks']
// Punctuation before the first word: '-What is it?', '"Did you?"'
const trimLead = str => str.replace(/^[^\p{L}\p{N}]+/u, '')
// These start a longer subject: 'your dog'
const possessive = /^(my|your|his|her|its|our|their)$/
// These only add or drop a 'not', and don't rebuild the question.
export const isPolar = target => target === 'negative' || target === 'positive'
// These open a new clause, instead of extending a subject: 'do the dishes [before] you leave'
const clause = /^(before|after|when|since|until|till|as|while|if|because|though|although|but|yet)$/

// A copula's subject can seem to swallow its predicate: 'is the book on the table?'
// The last preposition with an object usually divides them. Returns null if there is no subject.
const copulaEnd = function (terms, words, { start, end, finite, wh, asked }) {
  let at = end - 2
  while (at > start && (words[at] === 'of' || !terms.eq(at).has('#Prep'))) {
    at -= 1
  }
  const found = at > start
  // The wh-word is often the predicate: 'where is the book on the table?'
  if (wh) {
    return found && words[finite - 1] === 'why' ? at : end
  }
  // These are fragments: 'is the dog', 'is back on track', 'is back on?'
  const bare = !terms.eq(start).has('(#Det|#Prop|#Poss)')
  const stranded = terms.eq(end - 1).has('#Prep')
  if ((!asked && !found) || (bare && (!asked || stranded))) {
    return null
  }
  return found ? at : end
}

const whStart = /^(?:(?:in|on|at|to|for|from|with|about|by)\s+)?(?:why|when|where|how|what|who|whom|which|whose)\b/i
const auxStart = RegExp(`^(?:${auxWords}|won|shan)(?:n['’]t)?\\b`, 'i')
const isStart = str => whStart.test(str) || auxStart.test(str)

// Count the terms before a question: 'Well, did she walk?', 'Mr. Burns, is it?', 'please could you?'
const leadLength = function (list) {
  const comma = list.slice(0, 3).findIndex(term => term.post.includes(','))
  // More words with a verb are a statement, with a question tagged on: 'you walk, do you?'
  const opener = comma === 0 || (comma > 0 && !list.slice(0, comma + 1).some(term => term.tags.has(Vb)))
  const n = opener ? comma + 1 : 0
  return list[n]?.normal === 'please' ? n + 1 : n
}

const parseQuestion = function (sentence, target) {
  let text = trimLead(sentence.text())
  let lead = 0
  const asked = sentence.has('@hasQuestionMark$')
  if (!isStart(text)) {
    // Statements can have a lead too, so this needs a '?': 'Well, she walks.'
    lead = asked ? leadLength(sentence.docs[0]) : 0
    if (lead === 0) {
      return null
    }
    text = trimLead(sentence.terms().slice(lead).text())
    if (!isStart(text)) {
      return null
    }
  }
  const wh = whStart.test(text)
  const expanded = sentence.clone()
  expanded.contractions().expand()
  const terms = expanded.terms()
  const words = terms.map(t => trimLead(t.text('normal')), [])
  const len = words.length
  const at = i => terms.eq(i)
  // An object wh-phrase may contain several words ('which books', 'in which
  // city'). Its finite auxiliary still precedes a separate subject. Subject
  // wh-phrases fail the subject check below and stay on the ordinary path.
  const finite = wh ? words.findIndex((word, i) => i > lead && auxiliary.test(word)) : lead
  if (finite < 0) return null
  const fin = words[finite]
  if (!auxiliary.test(fin) || (fin === 'will' && at(finite).has('#Pers'))) return null
  const copula = /^(is|are|am|was|were)$/.test(fin)
  let start = finite + 1
  const frontNegative = words[start] === 'not'
  if (frontNegative) start += 1
  const first = words[start]
  const pronoun = at(start).has('#Pron') && !possessive.test(first)
  const polar = isPolar(target)
  const command = at(lead).has('#Imp')
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
    if (at(end).has('#Prep')) return null
    let noun = false
    let modified = false
    for (; end < len; end += 1) {
      const term = at(end)
      const word = words[end]
      if (clause.test(word) || !term.has('(#Det|#Adj|#NN|#Prep|#Conj)') || term.has('#Verb')) {
        break
      }
      if (noun && copula) {
        if (term.has('#Adj') || /ing$/.test(word)) {
          break
        }
        // A new noun phrase starts the predicate: 'is Tom [a doctor]', but 'is all the food'
        const prev = at(end - 1)
        if (term.has('(#Det|#Pron|#Poss)') && prev.has('#NN') && !prev.has('(#Poss|@hasComma|all|both)')) {
          break
        }
      }
      // A modifier can't provide the head noun: 'is wrong about him', but 'are some of them'
      noun ||= !modified && term.has('#NN') && !possessive.test(word)
      modified ||= term.has('#Prep') && word !== 'of'
    }
    if (!noun) return null
    // Nothing ended the subject. Adding a 'not' has its own rules for this, below.
    const open = clause.test(words[end]) || (end >= len && !polar)
    if (copula && open) {
      end = copulaEnd(terms, words, { start, end, finite, wh, asked })
      if (end === null) {
        return null
      }
    } else if (end < len && at(end - 1).has('(#Conj|#Prep)')) {
      // A verb can't follow a dangling word: 'do the dishes and walk the dog'
      if (!copula) {
        return null
      }
      // 'is dinner [at six]', but not 'some sort of hovercraft'
      if (words[end - 1] !== 'of') {
        end -= 1
      }
    }
  }
  // Where does a negative go, when the subject seems to reach the end?
  if (polar && copula && end >= len) {
    // The wh-word can be the subject: 'Who is there?'
    if (/^(who|what|which)$/.test(words[finite - 1])) {
      return null
    }
    // Otherwise a phrase can be the predicate: 'Is Tom a doctor?', 'Is the book on the table?'
    const predicate = words.findIndex((word, i) => i > start && (possessive.test(word) || (word !== 'of' && at(i).has('(#Det|#Prep)'))))
    if (!wh && predicate > -1) {
      // Leave an unclear subject to the ordinary path: 'Is this your dog?'
      if (!terms.slice(start, predicate).has('#NN')) {
        return null
      }
      end = predicate
    }
  }
  // Adding a 'not' can go without a predicate: 'Did you?' -> 'Did you not?'
  const bare = polar && asked && !command && end >= len
  // A question can elide its verb after a pronoun: 'did you?', 'why did you really?'
  let verb = end
  while (at(verb).has('(#Adv|#Neg)')) {
    verb += 1
  }
  // Without a verb, this asks for something: 'please do the dishes?', but 'please do they know?'
  if (words[lead - 1] === 'please' && doHave.test(fin) && !at(verb).has('#Verb')) {
    return null
  }
  // But 'do it?' is a command, and in 'who did it?' the pronoun is an object.
  const doIt = first === 'it' && doHave.test(fin)
  const hasObject = finite > lead && !/^(why|when|where|how)$/.test(words[finite - 1])
  const elided = !copula && !doIt && !hasObject && verb >= len && subjectPronoun.test(first) && asked
  // Polite questions have a predicate past the 'please': 'Could you please leave?'
  const optional = copula || bare || elided || (polar && words[end] === 'please')
  if (end === start || (end >= len && !optional)) return null
  if (!optional) {
    // A lexical verb can follow adverbs: 'do the walls really need paint'
    const lexical = at(verb).has('#Verb')
    // Without a '?', these are commands: 'do the dishes quickly', 'do the dishes, walk the dog'
    if (!asked && (!lexical || at(end - 1).has('@hasComma'))) {
      return null
    }
    // Asked, an adverb alone can be enough: 'did she really?'
    if (asked && !lexical && verb === end) {
      return null
    }
  }
  return { terms, words, finite, start, end, frontNegative, elided }
}

export const isInverted = (sentence, target) => Boolean(parseQuestion(sentence, target))

export const questionSelection = function (sentence, target) {
  const q = parseQuestion(sentence, target)
  if (!q) return null
  const offset = sentence.fullPointer[0][1]
  // These can sit outside the verb chunk: 'do the walls not really need', 'could you please leave'
  let end = q.end
  while (q.terms.eq(end).has('(#Neg|please)')) {
    end += 1
  }
  const at = offset + end
  let predicate = sentence.verbs().filter(vb => vb.fullPointer.some(ptr => ptr[1] <= at && ptr[2] > at))
  // Include directly coordinated dependents, but never a new subject/clause.
  for (let i = 0; i < q.words.length && predicate.found; i += 1) {
    const chain = predicate.growRight('(#Adv|#Neg)+? #Verb+ #Particle?')
    const next = chain.growRight('(and|or) #Adv+? #Verb+ #Particle?')
    if (next.wordCount() === predicate.wordCount()) break
    predicate = next
  }
  return sentence.terms().slice(q.finite, q.start).concat(predicate.not('#Conj')).settle()
}

// Index of a negative in the main predicate. 'not only' tags its 'not' as an adverb.
const predicateNot = function (terms, end) {
  for (let i = end; terms.eq(i).has('(#Verb|#Adv|#Neg|please)'); i += 1) {
    if (terms.eq(i).has('(#Neg|not)')) {
      return i
    }
  }
  return -1
}

const rechunk = sentence => sentence.fullSentence().compute('chunks')

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
  return rechunk(sentence)
}

// The auxiliary stays fronted, so only the 'not' goes: 'Does he not walk?' -> 'Does he walk?'
const affirm = function (sentence, { terms, start, end, frontNegative }) {
  const not = frontNegative ? start - 1 : predicateNot(terms, end)
  if (not < 0) {
    return sentence
  }
  sentence.terms().eq(not).remove()
  return rechunk(sentence)
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
  const { terms, words, finite, start, end, frontNegative, elided } = q
  // replaceWith restores the sentence's end-punctuation. All other punctuation stays.
  terms.termList().at(-1).post = ''
  const subject = terms.slice(start, end)
  // replaceWith() puts the leading punctuation back
  const prefix = finite > 0 ? trimLead(terms.slice(0, finite).text(keepPunct)) : ''
  let tail = terms.slice(end).text(keepPunct)
  // An elided verb converts through a stand-in, which is dropped afterwards.
  if (elided) {
    const standIn = /^ha/.test(words[finite]) ? 'walked' : 'walk'
    tail = `${standIn} ${tail}`.trim()
  }
  const negative = frontNegative ? ' not' : ''
  // A trimmed subject reads as one clause with its verb, despite any comma.
  const source = subject.text() + ' ' + words[finite] + negative + ' ' + tail
  // The scratch copies need ids, so that hardened pointers can survive their edits.
  const scratch = str => sentence.fromText(str).compute(tagged)
  let work = scratch(source)
  // Subject-first order keeps the scratch copy on the ordinary conversion path.
  firstGroup(work.verbs())[methods[target]]()
  if (work.text('normal') === sentence.fromText(source).text('normal')) return sentence
  work = scratch(work.text())
  const subjectLength = end - start
  let rest = work.terms().slice(subjectLength)
  // A copula can stay behind an adverb: 'he really is happy'
  let at = 0
  while (rest.eq(at).has('#Adv')) {
    at += 1
  }
  let verb = rest.eq(at)
  if (!verb.has('#Cop')) {
    verb = rest.eq(0)
  }
  let head = verb.text('normal')
  if (!auxiliary.test(head)) {
    // Simple lexical questions require do-support, even in positive forms.
    head = target === 'past' ? 'did' : doDoes(work.verbs(0))
    // The original verb is already bare. Tagging can miss the inflected one: 'really needed paint'
    if (target !== 'infinitive' && bareVerb.test(words[finite])) {
      rest = sentence.fromText(tail).terms()
    } else {
      firstGroup(work.verbs()).toInfinitive()
      rest = work.terms().slice(subjectLength)
    }
  } else {
    rest = rest.not(verb)
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
  if (elided) {
    rest = rest.not('(walk|walks|walked|walking)')
  }
  const result = [prefix, head, subject.text(keepPunct), rest.text(keepPunct)].filter(Boolean).join(' ')
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
  changed.terms().eq(finite).tag(Aux)
  return changed.compute('chunks')
}
export default question
