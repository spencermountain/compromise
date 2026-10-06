import test from 'tape'
import nlp from '../three/_lib.js'
const here = '[ignored/participle-verb-selection] '

// Deferred: The participial phrase is not selected as the separate verb expected here.
test(here + 'was shocked looking at', function (t) {
  const doc = nlp('i was shocked looking at the race')
  const verbs = doc.verbs()
  t.equal(verbs.length, 2, 'split into two')
  t.equal(verbs.eq(0).text(), 'was shocked', 'first verb')
  t.equal(verbs.eq(1).text(), 'looking', 'first verb')
  t.end()
})
