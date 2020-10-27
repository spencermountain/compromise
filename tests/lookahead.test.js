const test = require('tape')
const nlp = require('./_lib')

test('look-ahead', function (t) {
  let doc = nlp(`i walked to a store today. the store was very nice`)
  let m = doc.match('store').lookAhead('#Adjective')
  t.deepEqual(m.out('array'), ['nice'], 'found all upcoming adjectives')

  let m2 = doc.match('store').lookAhead('.')
  t.deepEqual(m2.out('array'), ['today.', 'was', 'very', 'nice'], 'found all upcoming words')

  let m3 = doc.match('store').lookAhead('farmer')
  t.equal(m3.found, false, 'lookahead empty')

  let m4 = doc.match('nice').lookAhead('.')
  t.equal(m4.found, false, 'lookahead on edge empty')

  let m5 = nlp('it is raining').match('raining').lookAhead()
  t.equal(m5.found, false, 'lookahead at end empty')

  let m6 = nlp('it is raining today and tomorrow').match('raining').lookAhead()
  t.equal(m6.text(), 'today and tomorrow', 'lookahead blank finds all')

  t.end()
})

test('lookahead from parent is blank', function (t) {
  let doc = nlp('it is raining')
  t.equal(doc.lookAhead('.').found, false, 'no after 1')

  doc = nlp('oh wow, it is raining. it is snowing? it is very cold.')
  t.equal(doc.lookAhead('.').found, false, 'no after 1')
  t.end()
})

test('look-behind', function (t) {
  let doc = nlp(`i walked to a store. the store was very nice`)
  let m = doc.match('store').lookBehind('#Determiner')
  t.deepEqual(m.out('array'), ['a', 'the'], 'found previous determiners')

  let m2 = doc.match('store').lookBehind('.')
  t.deepEqual(m2.out('array'), ['i', 'walked', 'to', 'a', 'the'], 'found all previous words')

  let m3 = doc.match('store').lookBehind('farmer')
  t.equal(m3.found, false, 'lookbehind not found')

  let m4 = doc.match('i').lookBehind('.')
  t.equal(m4.found, false, 'lookbehind on edge empty')

  let m6 = nlp('it is raining today and tomorrow').match('raining').lookBehind()
  t.equal(m6.text(), 'it is', 'lookbehind blank finds all')

  t.end()
})

test('look-behind-last', function (t) {
  let doc = nlp(`a priest walked into a bar`)
  let m = doc.match('bar').lookBehind('a').last()
  m.replace('the')
  t.equal(doc.text(), `a priest walked into the bar`, 'lookbehind most-recent')
  t.end()
})
