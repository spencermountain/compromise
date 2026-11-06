import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/negative-repeat] '

test(here + 'repeating verbs.toNegative adds no more negatives', t => {
  const rows = [
    ['he walks', 'he does not walk'],
    ['he is nice', 'he is not nice'],
    ['she walked', 'she did not walk'],
    ['we will play', 'we will not play'],
    ['she has walked', 'she has not walked'],
    ['he would walk', 'he would not walk'],
    ['he is walking', 'he is not walking'],
    ['he did walk', 'he did not walk'],
    ['he got walked', 'he did not get walked'],
    ['he was walked', 'he was not walked'],
    ['he used to walk', 'he did not used to walk'],
    ['he wants to walk', 'he does not want to walk'],
    ['please walk', 'please do not walk'],
    ['do not walk', 'do not walk'],
    ['He walks and talks.', 'He does not walk and does not talk.'],
    ['she knows that he works', 'she does not know that he does not work'],
    ['He walks. She sleeps.', 'He does not walk. She does not sleep.'],
    // 'not only' isn't tagged #Negative
    ['it only happens', 'it does not only happen'],
    ['it only happened', 'it did not only happen'],
    ['it does not only happen', 'it does not only happen'],
    // phrasal verbs
    ['he gives up', 'he does not give up'],
    ['she walked out', 'she did not walk out'],
  ]
  rows.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.verbs().toNegative()
    t.equal(doc.text(), expected, here + 'once: ' + input)
    doc.verbs().toNegative()
    t.equal(doc.text(), expected, here + 'twice: ' + input)
    doc.verbs().toNegative()
    t.equal(doc.text(), expected, here + 'three times: ' + input)
    const fresh = nlp(expected)
    fresh.verbs().toNegative()
    t.equal(fresh.text(), expected, here + 'fresh: ' + expected)
  })
  t.end()
})

test(here + 'the verb selection includes the inserted negative', t => {
  const rows = [
    ['he walks', ['does not walk']],
    ['he is nice', ['is not']],
    ['she has walked', ['has not walked']],
    ['He walks. She sleeps.', ['does not walk.', 'does not sleep.']],
  ]
  rows.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.verbs().toNegative()
    t.deepEqual(doc.verbs().out('array'), expected, here + 'selection: ' + input)
    t.equal(doc.verbs().isNegative().length, expected.length, here + 'isNegative: ' + input)
  })
  t.end()
})

test(here + 'repeats stay inside the selection', t => {
  const doc = nlp('He walks. She sleeps.')
  doc.verbs(0).toNegative()
  doc.verbs(0).toNegative()
  t.equal(doc.text(), 'He does not walk. She sleeps.', here + 'first sentence only')
  doc.verbs(1).toNegative()
  doc.verbs(1).toNegative()
  t.equal(doc.text(), 'He does not walk. She does not sleep.', here + 'then the second')

  const clause = nlp('she knows that he works')
  clause.verbs(1).toNegative()
  clause.verbs(1).toNegative()
  t.equal(clause.text(), 'she knows that he does not work', here + 'second clause only')
  t.end()
})

test(here + 'sentences and verbs can be mixed', t => {
  const doc = nlp('She walks home.')
  doc.sentences().toNegative()
  doc.verbs().toNegative()
  t.equal(doc.text(), 'She does not walk home.', here + 'sentences then verbs')
  doc.sentences().toNegative()
  t.equal(doc.text(), 'She does not walk home.', here + 'then sentences again')

  const only = nlp('It only happens when he watched them alone.')
  only.sentences().toNegative()
  only.sentences().toNegative()
  t.equal(only.text(), 'It does not only happen when he watched them alone.', here + 'sentences with not only')

  // A repeat doesn't reach into another clause.
  const clause = nlp('The boy who you saw at the store committed a robbery.')
  clause.sentences().toNegative()
  clause.sentences().toNegative()
  t.equal(clause.text(), 'The boy who you saw at the store did not commit a robbery.', here + 'relative clause left alone')
  t.end()
})

test(here + 'an inserted auxiliary is tagged like a parsed one', t => {
  const rows = [
    ['he gives up', 'does'],
    ['she walked out', 'did'],
    ['they sit down', 'do'],
    ['he walks', 'does'],
  ]
  rows.forEach(([input, aux]) => {
    const doc = nlp(input)
    doc.verbs().toNegative()
    t.ok(doc.match(aux).has('#Auxiliary'), here + 'auxiliary: ' + input)
    t.equal(doc.verbs().parse()[0].root.has(aux), false, here + 'not the root: ' + input)
  })
  t.end()
})

test(here + 'negated verbs keep converting', t => {
  const rows = [
    ['he walks', 'toPositive', 'he walks'],
    ['she walked', 'toPositive', 'she walked'],
    ['he is nice', 'toPositive', 'he is nice'],
    ['we will play', 'toPositive', 'we will play'],
    ['he walks', 'toPastTense', 'he did not walk'],
    ['he walks', 'toPresentTense', 'he does not walk'],
    ['he walks', 'toFutureTense', 'he will not walk'],
    ['we will play', 'toPastTense', 'we did not play'],
    ['he is nice', 'toFutureTense', 'he will not be nice'],
  ]
  rows.forEach(([input, method, expected]) => {
    const doc = nlp(input)
    doc.verbs().toNegative()
    doc.verbs()[method]()
    t.equal(doc.text(), expected, here + method + ': ' + input)
  })
  t.end()
})
