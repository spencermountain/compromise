import test from 'tape'
import nlp from '../_lib.js'

const perfect = [
  ['she should be swimming', 'she should have been swimming'],
  ['they must not really be walking', 'they must not really have been walking'],
  ['she might be really swimming', 'she might have been really swimming'],
  ['she ought to swim', 'she ought to have swum'],
  ['they ought to be swimming', 'they ought to have been swimming'],
  ['she ought to be driven', 'she ought to have been driven'],
  ['she should be driven', 'she should have been driven'],
  ['they should be being watched', 'they should have been being watched'],
  ['she can have tea', 'she can have had tea'],
  ['she should be happy', 'she should have been happy'],
  ['she might give up', 'she might have given up'],
  ["She shouldn't be swimming.", 'She should not have been swimming.'],
  ['she is going to be driven', 'she is going to have been driven'],
  ['they were not really going to be watched', 'they were not really going to have been watched'],
  ['she is going to be really driven', 'she is going to have been really driven'],
  ['they are going to be being watched', 'they are going to have been being watched'],
]

const unchanged = [
  'she should have been swimming',
  'they must not have been being watched',
  'she ought to have swum',
  'she ought to have been swimming',
  'she is going to have eaten',
  'she was not really going to have eaten',
  'she is going to have really eaten',
  'they are going to have been swimming',
  'she is going to have been driven',
  'she is going to have had tea',
  "She shouldn't have been swimming.",
  "She isn't going to have eaten.",
]

test('perfect conversion handles modal and nested going-to chains', t => {
  perfect.concat(unchanged.map(s => [s, s])).forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.verbs().toPastParticiple()
    t.equal(doc.text(), expected, input)
    doc.verbs().toPastParticiple()
    t.equal(doc.text(), expected, 'repeated: ' + input)
    const reparsed = nlp(expected)
    reparsed.verbs().toPastParticiple()
    t.equal(reparsed.text(), expected, 'fresh parse: ' + expected)
  })
  t.end()
})

test('nested going-to tense changes preserve the complement', t => {
  const cases = [
    ['she is going to be driven', 'she was going to be driven', 'she is going to be driven'],
    ['they were not going to have eaten', 'they were not going to have eaten', 'they are not going to have eaten'],
    ['I am going to have been swimming', 'I was going to have been swimming', 'I am going to have been swimming'],
    ['she was going to be really driven', 'she was going to be really driven', 'she is going to be really driven'],
    ['they are going to have had tea', 'they were going to have had tea', 'they are going to have had tea'],
  ]
  cases.forEach(([input, past, present]) => {
    const methods = { toPastTense: past, toPresentTense: present, toFutureTense: present }
    Object.entries(methods).forEach(([method, expected]) => {
      for (const selection of ['verbs', 'sentences']) {
        const doc = nlp(input)
        doc[selection]()[method]()
        t.equal(doc.text(), expected, selection + '.' + method + ': ' + input)
        doc[selection]()[method]()
        t.equal(doc.text(), expected, 'repeated: ' + selection + '.' + method + ': ' + input)
        const fresh = nlp(expected)
        fresh[selection]()[method]()
        t.equal(fresh.text(), expected, 'fresh: ' + selection + '.' + method + ': ' + input)
      }
    })
  })
  t.end()
})
