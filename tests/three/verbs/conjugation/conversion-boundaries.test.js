import test from 'tape'
import nlp from '../../_lib.js'

// Compare explicit sentence outputs, then check both retained and freshly
// inferred tags. Repetition alone could silently preserve a wrong first result.
const check = (t, input, method, expected, selection = 'verbs') => {
  const doc = nlp(input)
  doc[selection]()[method]()
  t.equal(doc.text(), expected, method + ': ' + input)
  doc[selection]()[method]()
  t.equal(doc.text(), expected, 'repeat: ' + method + ': ' + input)
  const fresh = nlp(expected)
  fresh[selection]()[method]()
  t.equal(fresh.text(), expected, 'fresh: ' + method + ': ' + input)
}

test('conversions preserve prepositional gerunds and passive/perfect complements', t => {
  const complements = [
    'by swimming and diving',
    'by being watched',
    'by not being closely watched and being helped',
    'by having eaten',
    'by having been watched and swimming and being helped',
    'without being driven',
    'without really having been told',
  ]
  const main = {
    toPastTense: 'she learned',
    toPresentTense: 'she learns',
    toFutureTense: 'she will learn',
    toPastParticiple: 'she has learned',
    toGerund: 'she is learning',
    toInfinitive: 'she learn',
  }
  complements.forEach(complement => {
    Object.entries(main).forEach(([method, expected]) => {
      check(t, 'she learns ' + complement, method, expected + ' ' + complement)
    })
  })
  const doc = nlp('she learns by being watched and he watches by swimming')
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'she learned by being watched and he watched by swimming', 'a new finite clause still changes')
  t.end()
})

test('infinitival complements survive every conversion and reparsing', t => {
  const complements = ['to have a car', 'to be watched', 'to have been watched', 'to not really have eaten']
  const main = {
    toPastTense: 'she wanted',
    toPresentTense: 'she wants',
    toFutureTense: 'she will want',
    toPastParticiple: 'she has wanted',
    toGerund: 'she is wanting',
    toInfinitive: 'she want',
  }
  complements.forEach(complement => {
    Object.entries(main).forEach(([method, expected]) => {
      check(t, 'she wants ' + complement, method, expected + ' ' + complement)
    })
  })
  check(t, 'she is going to have a car', 'toPastParticiple', 'she has been going to have a car')
  check(t, 'she is going to swim', 'toPastParticiple', 'she has been going to swim')
  check(t, 'she is going to be swimming', 'toPastParticiple', 'she has been going to be swimming')
  t.end()
})

test('gerund conversions retain agreement, voice, modifiers and punctuation', t => {
  const cases = [
    ['she does not walk', 'she is not walking'],
    ["She doesn't really walk.", 'She is not really walking.'],
    ['I do not walk', 'I am not walking'],
    ['they do not walk', 'they are not walking'],
    ['the dog does not walk', 'the dog is not walking'],
    ['she is driven', 'she is being driven'],
    ['they were not really driven', 'they are not really being driven'],
    ['they were not really watched', 'they are not being really watched'],
    ['she will not be driven', 'she is not being driven'],
    ['she has not been watched', 'she is not being watched'],
    ['they had been watched', 'they are being watched'],
    ['she could be driven', 'she is being driven'],
    ['she ought not to be watched', 'she is not being watched'],
    ['she is going to be driven', 'she is being driven'],
    ['she is not being watched', 'she is not being watched'],
    ['she has been being watched', 'she has been being watched'],
    ["She isn't happy.", 'She is not being happy.'],
    ['I was not happy', 'I am not being happy'],
    ['they will not be happy', 'they are not being happy'],
  ]
  cases.forEach(([input, expected]) => check(t, input, 'toGerund', expected))
  t.end()
})

test('negative auxiliary phrases convert as a unit', t => {
  const cases = [
    ['she ought not to swim', 'toPastParticiple', 'she ought not to have swum'],
    ['she ought not to be swimming', 'toPastParticiple', 'she ought not to have been swimming'],
    ['she ought not to be watched', 'toPastParticiple', 'she ought not to have been watched'],
    ['she ought not to have eaten', 'toPastParticiple', 'she ought not to have eaten'],
    ['she ought not to swim', 'toPresentTense', 'she ought not to swim'],
    ['she ought not to swim', 'toGerund', 'she is not swimming'],
    ['she ought not to swim', 'toInfinitive', 'she does not swim'],
    ['she ought not to be watched', 'toInfinitive', 'she does not watch'],
    ['she is not happy', 'toInfinitive', 'she is not happy'],
    ['I was not really happy', 'toInfinitive', 'I am not really happy'],
    ['they will not be happy', 'toInfinitive', 'they are not happy'],
    ['she has not been happy', 'toInfinitive', 'she is not happy'],
    ["She isn't happy.", 'toInfinitive', 'She is not happy.'],
    ['she is not walking', 'toFutureTense', 'she will not be walking'],
    ['they were not really walking', 'toFutureTense', 'they will not really be walking'],
    ["She isn't walking.", 'toFutureTense', 'She will not be walking.'],
  ]
  cases.forEach(([input, method, expected]) => check(t, input, method, expected))
  t.end()
})

test('sentence tense conversions share complement boundaries', t => {
  const cases = [
    ['she learns by being watched', 'toPastTense', 'she learned by being watched'],
    ['she wants to have a car', 'toFutureTense', 'she will want to have a car'],
    ['she ought not to swim', 'toPresentTense', 'she ought not to swim'],
    ['she is not walking', 'toFutureTense', 'she will not be walking'],
  ]
  cases.forEach(([input, method, expected]) => check(t, input, method, expected, 'sentences'))
  t.end()
})
