import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/lookahead] '


test('look-ahead', function (t) {
  const doc = nlp(`i walked to a store today. the store was very nice`)
  const m = doc.match('store').lookAhead('#Adjective')
  t.deepEqual(m.out('array'), ['nice'], here+'found all upcoming adjectives')

  const m2 = doc.match('store').lookAhead('.')
  t.deepEqual(m2.out('array'), ['today.', 'was', 'very', 'nice'], here+'found all upcoming words')

  const m3 = doc.match('store').lookAhead('farmer')
  t.equal(m3.found, false, here+'lookahead empty')

  const m4 = doc.match('nice').lookAhead('.')
  t.equal(m4.found, false, here+'lookahead on edge empty')

  const m5 = nlp('it is raining').match('raining').lookAhead()
  t.equal(m5.found, false, here+'lookahead at end empty')

  const m6 = nlp('it is raining today and tomorrow').match('raining').lookAhead()
  t.equal(m6.text(), 'today and tomorrow', here+'lookahead blank finds all')

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
  const doc = nlp(`i walked to a store. the store was very nice`)
  const m = doc.match('store').lookBehind('#Determiner')
  t.deepEqual(m.out('array'), ['a', 'the'], 'found previous determiners')

  const m2 = doc.match('store').lookBehind('.')
  t.deepEqual(m2.out('array'), ['i', 'walked', 'to', 'a', 'the'], 'found all previous words')

  const m3 = doc.match('store').lookBehind('farmer')
  t.equal(m3.found, false, 'lookbehind not found')

  const m4 = doc.match('i').lookBehind('.')
  t.equal(m4.found, false, 'lookbehind on edge empty')

  const m6 = nlp('it is raining today and tomorrow').match('raining').lookBehind()
  t.equal(m6.text(), 'it is', 'lookbehind blank finds all')

  t.end()
})

test('look-behind-last', function (t) {
  const doc = nlp(`a priest walked into a bar`)
  const m = doc.match('bar').lookBehind('a').last()
  m.replace('the')
  t.equal(doc.text(), `a priest walked into the bar`, 'lookbehind most-recent')
  t.end()
})
