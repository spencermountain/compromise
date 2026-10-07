import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/sentences/negation-boundaries] '

test(here + 'coordinated verbs share negation without changing their subject', t => {
  const cases = [
    ['They sing and dance.', 'They do not sing and dance.'],
    ['She sings and dances.', 'She does not sing and dance.'],
    ['She sang and danced.', 'She did not sing and dance.'],
    ['They can sing and dance.', 'They can not sing and dance.'],
  ]
  cases.forEach(([positive, negative]) => {
    const doc = nlp(positive)
    doc.sentences().toNegative()
    t.equal(doc.text(), negative, here + positive)
    doc.sentences().toNegative()
    t.equal(doc.text(), negative, here + 'repeat: ' + positive)
    const restored = nlp(negative)
    restored.sentences().toPositive()
    t.equal(restored.text(), positive, here + 'positive: ' + negative)
  })
  t.end()
})

test(here + 'negation changes the main clause and preserves subordinate clauses', t => {
  const cases = [
    ['She knows that he works.', 'She does not know that he works.'],
    ['She smiles when he calls.', 'She does not smile when he calls.'],
    ['When he calls, she smiles.', 'When he calls, she does not smile.'],
    ['If it rains, they stay home.', 'If it rains, they do not stay home.'],
    ['The dog that barks sleeps.', 'The dog that barks does not sleep.'],
  ]
  cases.forEach(([positive, negative]) => {
    const doc = nlp(positive)
    doc.sentences().toNegative()
    t.equal(doc.text(), negative, here + positive)
    doc.sentences().toNegative()
    t.equal(doc.text(), negative, here + 'repeat: ' + positive)
    const restored = nlp(negative)
    restored.sentences().toPositive()
    t.equal(restored.text(), positive, here + 'positive: ' + negative)
  })
  t.end()
})

test(here + 'converting a middle sentence preserves both neighbors', t => {
  const input = 'Alice is ready. Bob walks home. Carol is not tired.'
  const negative = 'Alice is ready. Bob does not walk home. Carol is not tired.'
  const doc = nlp(input)
  doc.sentences(1).toNegative()
  t.equal(doc.text(), negative, here + 'negative selection')
  doc.sentences(1).toNegative()
  t.equal(doc.text(), negative, here + 'repeat selection')
  doc.sentences(1).toPositive()
  t.equal(doc.text(), input, here + 'positive selection')
  doc.sentences(1).toPositive()
  t.equal(doc.text(), input, here + 'repeat positive selection')
  t.end()
})
