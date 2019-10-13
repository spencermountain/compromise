const test = require('tape')
const nlp = require('./_lib')

test('look-behind', function(t) {
  let doc = nlp(`i walked to a store. the store was very nice`)
  let m = doc.match('store').lookBehind('#Determiner')
  t.deepEqual(m.out('array'), ['a', 'the'], 'found previous determiners')

  let m2 = doc.match('store').lookBehind('.')
  t.deepEqual(m2.out('array'), ['i', 'walked', 'to', 'a', 'the'], 'found all previous words')

  let m3 = doc.match('store').lookBehind('farmer')
  t.equal(m3.found, false, 'lookbehind not found')
  t.end()
})
