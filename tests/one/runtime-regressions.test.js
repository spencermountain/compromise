import test from 'tape'
import nlp from './_lib.js'

test('dictionary keys in frequency counts', t => {
  const doc = nlp('apple constructor constructor pear')
  t.deepEqual(doc.terms().out('freq'), [
    { normal: 'constructor', count: 2 },
    { normal: 'apple', count: 1 },
    { normal: 'pear', count: 1 },
  ], 'counts inherited names and sorts descending with stable ties')
  doc.compute('freq')
  t.deepEqual(doc.termList().map(term => term.freq), [1, 2, 2, 1], 'term frequencies stay numeric')
  t.deepEqual(doc.terms().sort('freq').out('array'), ['constructor', 'constructor', 'apple', 'pear'], 'frequency sorting handles inherited names')
  t.end()
})

test('fuzzy matching preserves a zero threshold', t => {
  const doc = nlp('talk')
  t.equal(doc.match('~walk~', null, { fuzzy: 0 }).text(), 'talk', 'accepts an explicit zero')
  t.equal(doc.match('~walk~', null, {}).text(), '', 'omitted threshold retains the default')
  t.equal(doc.match('~walk~', null, { fuzzy: null }).text(), '', 'null threshold retains the default')
  t.end()
})

test('lexicon membership does not depend on inherited methods', t => {
  const model = nlp.model().one
  const original = model.lexicon
  t.teardown(() => { model.lexicon = original })
  for (const lexicon of [{ hasOwnProperty: 'Noun' }, Object.create(null)]) {
    lexicon.zorb = 'Noun'
    model.lexicon = lexicon
    t.equal(nlp('zorb').compute('lexicon').has('#Noun'), true, 'accepts shadowed methods and null prototypes')
  }
  t.end()
})
