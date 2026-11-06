import test from 'tape'
import nlp from '../lib.js'
const here = '[three/find-no-match] '

test(here + 'find without a match is an empty view', function (t) {
  const str = 'The walls are green. The dog is asleep.'
  const doc = nlp(str)
  const none = doc.find(m => m.has('zebra'))
  t.equal(none.found, false, here + 'found')
  t.equal(none.length, 0, here + 'length')
  t.equal(none.text(), '', here + 'text')
  t.deepEqual(none.out('array'), [], here + 'array')
  t.deepEqual(none.json(), [], here + 'json')
  t.deepEqual(none.fullPointer, [], here + 'pointer')
  t.equal(none.match('dog').found, false, here + 'chain match')
  t.equal(none.terms().found, false, here + 'chain terms')
  t.equal(doc.text(), str, here + 'parent unchanged')
  t.end()
})

test(here + 'find on an empty view', function (t) {
  t.equal(nlp('').find(m => m.has('zebra')).text(), '', here + 'empty doc')
  const none = nlp('The walls are green.').match('zebra').find(() => true)
  t.equal(none.found, false, here + 'empty match')
  t.end()
})

test(here + 'find keeps the subclass', function (t) {
  const doc = nlp('The dog walked and it ran.')
  const none = doc.verbs().find(m => m.has('zebra'))
  t.equal(none.viewType, 'Verbs', here + 'no-match')
  t.equal(none.found, false, here + 'no-match found')
  const some = doc.verbs().find(m => m.has('ran'))
  t.equal(some.viewType, 'Verbs', here + 'match')
  t.end()
})

test(here + 'find still returns the first match', function (t) {
  const doc = nlp('The walls are green. The dog is asleep. The dog is awake.')
  t.equal(doc.find(m => m.has('dog')).text(), 'The dog is asleep.', here + 'first')
  t.equal(doc.find((_m, i) => i === 0).text(), 'The walls are green.', here + 'first index')
  t.equal(doc.find((_m, i) => i === 2).text(), 'The dog is awake.', here + 'last index')
  t.end()
})
