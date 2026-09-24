import test from 'tape'
import nlp from '../../_lib.js'

test('question conversion stays inside selected sentences', t => {
  const source = 'She walks. Has he eaten? They sleep.'
  const selectors = [
    doc => doc.sentences(1),
    doc => doc.sentences(1).verbs(),
    doc => doc.verbs().slice(1, 3),
  ]
  selectors.forEach(select => {
    const doc = nlp(source)
    select(doc).toFutureTense()
    t.equal(doc.text(), 'She walks. Will he have eaten? They sleep.', 'surrounding sentences preserved')
    select(doc).toFutureTense()
    t.equal(doc.text(), 'She walks. Will he have eaten? They sleep.', 'repeated selected conversion')
  })
  for (const index of [1, 2]) {
    const doc = nlp(source)
    doc.verbs(index).toFutureTense()
    t.equal(doc.text(), source, 'incomplete inverted phrase remains intact')
  }
  t.end()
})

test('main and subordinate question predicates can be selected independently', t => {
  const source = 'Has she eaten after he arrived?'
  const rows = [
    [doc => doc.verbs().slice(0, 2), 'Will she have eaten after he arrived?'],
    [doc => doc.verbs(2), 'Has she eaten after he will arrive?'],
    [doc => doc.match('after he arrived').verbs(), 'Has she eaten after he will arrive?'],
    [doc => doc.verbs(), 'Will she have eaten after he will arrive?'],
    [doc => doc.verbs(0).concat(doc.verbs(2)).verbs(), 'Has she eaten after he will arrive?'],
  ]
  rows.forEach(([select, expected]) => {
    const doc = nlp(source)
    const changed = select(doc).toFutureTense()
    t.equal(doc.text(), expected, 'selected predicates only')
    changed.verbs().toFutureTense()
    t.equal(doc.text(), expected, 'returned selection stays bounded')
  })
  const doc = nlp(source)
  const changed = doc.verbs().slice(0, 2).toFutureTense()
  t.equal(changed.has('arrive'), false, 'returned main selection excludes subordinate predicate')
  changed.verbs().toPastTense()
  t.equal(doc.text(), 'Had she eaten after he arrived?', 'chaining keeps the subordinate clause intact')
  const coordinated = nlp('Has she eaten and slept?')
  coordinated.verbs().slice(0, 2).toGerund()
  t.equal(coordinated.text(), 'Has she eaten and slept?', 'unselected shared dependent prevents partial rewrite')
  t.end()
})
