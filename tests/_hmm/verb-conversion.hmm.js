import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/verb-conversion] '

// Verb conversions that are still wrong.
// Expected text comes from the language, not the code, so these lines fail today.
const convert = (str, select, method) => {
  const doc = nlp(str)
  doc[select]()[method]()
  return doc.text()
}
const check = (t, select, rows) => {
  rows.forEach(([str, method, want]) => {
    t.equal(convert(str, select, method), want, `${here}${method}: ${str}`)
  })
  t.end()
}

// 'is on' is tagged as a phrasal verb, but 'be on' can't be conjugated.
// The first of these loses a word.
test(here + 'a copula tagged as a phrasal verb', t => {
  check(t, 'verbs', [
    ['the book is on', 'toPresentTense', 'the book is on'],
    ['the book is on', 'toFutureTense', 'the book will be on'],
    ['the book is on', 'toInfinitive', 'the book be on'],
    ['the book is on', 'toPastParticiple', 'the book has been on'],
    ['the book was on', 'toFutureTense', 'the book will be on'],
    ['the dishes are for?', 'toPresentTense', 'the dishes are for?'],
    ['the dishes are for?', 'toPastTense', 'the dishes were for?'],
    ['the dishes are for?', 'toFutureTense', 'the dishes will be for?'],
  ])
})

// These can't be split until the phrasal copula above works: 'Did the book bed on?'
test(here + 'a stranded preposition belongs to the predicate', t => {
  check(t, 'sentences', [
    ['Is the book on?', 'toFutureTense', 'Will the book be on?'],
    ['What are the dishes for?', 'toFutureTense', 'What will the dishes be for?'],
    ['Who is the letter from?', 'toFutureTense', 'Who will the letter be from?'],
    ['Which city is the book in?', 'toFutureTense', 'Which city will the book be in?'],
  ])
})

// A clause that starts with a wh-word is read as an inverted question.
// Rejecting a pronoun after the wh-word isn't enough, as the ordinary path then
// mistakes the subject: 'What I want is a dog' -> 'What I want am a dog'
test(here + 'a wh-clause is not a question', t => {
  check(t, 'sentences', [
    ['When I was a kid, I walked', 'toFutureTense', 'When I will be a kid, I will walk'],
    ['When I was a kid, I walked', 'toPresentTense', 'When I am a kid, I walk'],
    ['When Tom is a doctor', 'toFutureTense', 'When Tom will be a doctor'],
    ['What I want is a dog', 'toFutureTense', 'What I want will be a dog'],
    ['what he really needed was sleep', 'toFutureTense', 'what he really needed will be sleep'],
    ['Which I believe was some sort of hovercraft.', 'toFutureTense', 'Which I believe will be some sort of hovercraft.'],
  ])
})

test(here + 'a subject without a noun', t => {
  check(t, 'sentences', [
    ['Is this a dog?', 'toFutureTense', 'Will this be a dog?'],
    ['Is that a problem?', 'toFutureTense', 'Will that be a problem?'],
    ['Are these my keys?', 'toFutureTense', 'Will these be my keys?'],
    ['Is this your dog?', 'toFutureTense', 'Will this be your dog?'],
    ['Is there a problem?', 'toFutureTense', 'Will there be a problem?'],
    ['Is there a problem?', 'toPastTense', 'Was there a problem?'],
    ['Is there any more?', 'toFutureTense', 'Will there be any more?'],
    ['Is one of them a doctor?', 'toFutureTense', 'Will one of them be a doctor?'],
    ['Is half the class absent?', 'toFutureTense', 'Will half the class be absent?'],
  ])
})

test(here + 'the same subjects, adding a not', t => {
  check(t, 'sentences', [
    ['Is there hope?', 'toNegative', 'Is there not hope?'],
    ['Is this your dog?', 'toNegative', 'Is this not your dog?'],
    ['Do the walls need paint', 'toNegative', 'Do the walls not need paint'],
  ])
})

test(here + 'a command is not a question', t => {
  check(t, 'sentences', [
    ['Do the dishes then walk the dog', 'toFutureTense', 'Do the dishes then walk the dog'],
    ['Have the dishes ready', 'toFutureTense', 'Have the dishes ready'],
    ['Wash the dishes and walk the dog', 'toPastTense', 'Wash the dishes and walk the dog'],
    ['Do the dishes and walk the dog', 'toPastTense', 'Do the dishes and walk the dog'],
  ])
})

test(here + 'every verb in a command is left alone', t => {
  check(t, 'verbs', [
    ['Wash the dishes and walk the dog', 'toFutureTense', 'Wash the dishes and walk the dog'],
    ['Do the dishes and walk the dog', 'toFutureTense', 'Do the dishes and walk the dog'],
    ['Do the dishes before you leave', 'toPastTense', 'Do the dishes before you leave'],
  ])
})

// An irregular verb isn't found while it keeps its capital, in the participle path.
test(here + 'a capitalized verb is still conjugated', t => {
  check(t, 'verbs', [
    ['Go home now', 'toPastParticiple', 'Has gone home now'],
    ['Do it now', 'toPastParticiple', 'Has done it now'],
    ['Do the dishes quickly', 'toPastParticiple', 'Has done the dishes quickly'],
    ['Run the race', 'toPastParticiple', 'Has run the race'],
    ['Eat your vegetables', 'toPastParticiple', 'Has eaten your vegetables'],
    ['Ran the race', 'toPastParticiple', 'Has run the race'],
  ])
})

test(here + 'sentence-case is kept', t => {
  check(t, 'verbs', [
    ['Is wrong about him', 'toFutureTense', 'Will be wrong about him'],
    ['Is wrong about him', 'toPastTense', 'Was wrong about him'],
    ['Is wrong about him', 'toPresentTense', 'Is wrong about him'],
    ['Have eaten', 'toFutureTense', 'Will have eaten'],
    ['Have eaten', 'toPastTense', 'Had eaten'],
    ['Does walk', 'toPastTense', 'Did walk'],
    ['Walks the dog', 'toPresentTense', 'Walks the dog'],
    ['Are happy', 'toPastTense', 'Were happy'],
  ])
})

// 'read' looks like a past form that loses its ending.
test(here + 'the infinitive of read', t => {
  check(t, 'verbs', [
    ['she has read', 'toInfinitive', 'she read'],
    ['Which books has she read?', 'toInfinitive', 'Which books does she read?'],
  ])
})

// These used to throw. They no longer do, but the rewritten text isn't right.
test(here + 'a demonstrative pronoun as the subject', t => {
  check(t, 'verbs', [
    ['do these work?', 'toPastTense', 'did these work?'],
    ['do these work?', 'toPresentTense', 'do these work?'],
    ['do these work?', 'toFutureTense', 'will these work?'],
  ])
})

test(here + 'an adverb stays before the predicate', t => {
  check(t, 'sentences', [
    ['Is Tom really a doctor?', 'toFutureTense', 'Will Tom really be a doctor?'],
  ])
})

test(here + 'agreement with a longer subject', t => {
  check(t, 'verbs', [
    ['Are some of them in the room?', 'toPastParticiple', 'Have some of them been in the room?'],
    ['Were Tom and Mary a couple?', 'toPastParticiple', 'Have Tom and Mary been a couple?'],
  ])
})
