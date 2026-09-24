import test from 'tape'
import nlp from '../../_lib.js'

const verify = (t, input, method, expected) => {
  const doc = nlp(input)
  doc.verbs()[method]()
  t.equal(doc.text(), expected, method + ': ' + input)
  doc.verbs()[method]()
  t.equal(doc.text(), expected, 'repeated: ' + input)
  const fresh = nlp(expected)
  fresh.verbs()[method]()
  t.equal(fresh.text(), expected, 'fresh: ' + expected)
}

test('second-person present tense uses the base verb', t => {
  const rows = [
    ['You walked.', 'You walk.'],
    ['You walk.', 'You walk.'],
    ['You ate.', 'You eat.'],
    ['You will walk.', 'You walk.'],
    ['You will eat and sleep.', 'You eat and sleep.'],
    ['You did not walk.', 'You do not walk.'],
  ]
  rows.forEach(([input, expected]) => verify(t, input, 'toPresentTense', expected))
  t.end()
})

test('of-phrase objects do not control verb agreement', t => {
  const rows = [
    ['The box of pencils is missing.', 'toPastTense', 'The box of pencils was missing.'],
    ['The box of pencils is missing.', 'toPresentTense', 'The box of pencils is missing.'],
    ['The box of pencils is missing.', 'toPastParticiple', 'The box of pencils has been missing.'],
    ['The box of pencils fell.', 'toPresentTense', 'The box of pencils falls.'],
    ['The box of pencils fell.', 'toPastParticiple', 'The box of pencils has fallen.'],
    ['The box of pencils has fallen.', 'toGerund', 'The box of pencils is falling.'],
    ['The boxes of pencils fell.', 'toPresentTense', 'The boxes of pencils fall.'],
    ['The boxes of pencils fell.', 'toPastParticiple', 'The boxes of pencils have fallen.'],
    ['The boxes of pencils have fallen.', 'toGerund', 'The boxes of pencils are falling.'],
    ['Some of the dogs walked.', 'toPresentTense', 'Some of the dogs walk.'],
    ['Some of the dogs walked.', 'toPastParticiple', 'Some of the dogs have walked.'],
  ]
  rows.forEach(([input, method, expected]) => verify(t, input, method, expected))
  t.end()
})
