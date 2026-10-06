import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentences/negative-sentences] '

test('sentences.toPositive', function (t) {
  const doc = nlp(`do not use reverse psychology.`)
  doc.sentences().toPositive()
  t.equal(doc.text(), 'use reverse psychology.', here + 'neg')

  doc.sentences().toNegative()
  t.equal(doc.text(), 'do not use reverse psychology.', here + 'back to neg')

  t.end()
})

test('sentences.toPositive does-not', function (t) {
  const doc = nlp(`He does not like camels.`)
  doc.sentences().toPositive()
  t.equal(doc.text(), 'He likes camels.', here + 'does not')

  doc.sentences().toNegative()
  t.equal(doc.text(), 'He does not like camels.', here + 'back to neg')
  t.end()
})

test(here + 'negation across copulas, tenses and modals', t => {
  const cases = [
    ['She is ready.', 'She is not ready.'],
    ['They are ready.', 'They are not ready.'],
    ['I am ready.', 'I am not ready.'],
    ['He was tired.', 'He was not tired.'],
    ['They were outside.', 'They were not outside.'],
    ['She walks home.', 'She does not walk home.'],
    ['They walked home.', 'They did not walk home.'],
    ['We will leave.', 'We will not leave.'],
    ['You should wait.', 'You should not wait.'],
    ['They could swim.', 'They could not swim.'],
    ['She has eaten lunch.', 'She has not eaten lunch.'],
    ['They are walking home.', 'They are not walking home.'],
  ]
  cases.forEach(([positive, negative]) => {
    const doc = nlp(positive)
    doc.sentences().toNegative()
    t.equal(doc.text(), negative, here + 'negative: ' + positive)
    doc.sentences().toNegative()
    t.equal(doc.text(), negative, here + 'negative is idempotent: ' + positive)
    const restored = nlp(negative)
    restored.sentences().toPositive()
    t.equal(restored.text(), positive, here + 'positive: ' + negative)
    restored.sentences().toPositive()
    t.equal(restored.text(), positive, here + 'positive is idempotent: ' + negative)
  })
  t.end()
})

test(here + 'contracted negatives become positive statements', t => {
  const cases = [
    ["She isn't ready.", 'She is ready.'],
    ["They aren't ready.", 'They are ready.'],
    ["He doesn't like tea.", 'He likes tea.'],
    ["They didn't leave.", 'They left.'],
    ["We won't leave.", 'We will leave.'],
    ["She can't swim.", 'She can swim.'],
    ["You shouldn't worry.", 'You should worry.'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.sentences().toPositive()
    t.equal(doc.text(), expected, here + input)
  })
  t.end()
})

test(here + 'sentence negation respects selection boundaries', t => {
  const doc = nlp('She walks home. They are not ready.')
  doc.sentences(0).toNegative()
  t.equal(doc.text(), 'She does not walk home. They are not ready.', here + 'only first sentence changes')
  doc.sentences().toPositive()
  t.equal(doc.text(), 'She walks home. They are ready.', here + 'mixed sentences become positive')
  const empty = nlp('')
  empty.sentences().toNegative()
  empty.sentences().toPositive()
  t.equal(empty.text(), '', here + 'empty document')
  t.end()
})
