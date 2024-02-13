import test from 'tape'
import nlp from './_lib.js'
const here = ' [dates/before-after] '

test('isBefore misc', function (t) {
  let doc = nlp('i went on June 5th 1999 and then on April 7 2008')
  let m = doc.dates().isBefore('2000-02-01')
  t.deepEqual(m.out('array'), ['June 5th 1999'], here + 'days')

  doc = nlp('and between Sept and Oct 2008, but then June 2010')
  m = doc.dates().isBefore('2009-01')
  t.deepEqual(m.out('array'), ['between Sept and Oct 2008'], here + 'months')

  t.end()
})
