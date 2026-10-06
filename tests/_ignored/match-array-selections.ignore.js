import test from 'tape'
import nlp from '../two/_lib.js'
const here = '[ignored/match-array-selections] '

// Deferred: Array patterns do not currently produce the disjoint selections expected here.
test(here + 'match-from-array :', function (t) {
  let m = nlp('spencer is really cool').match(['spencer'])
  t.equal(m.out('normal'), 'spencer', 'just-spencer')
  t.equal(m.length, 1, 'one-result')

  m = nlp('spencer is really cool').match([])
  t.equal(m.out('normal'), '', 'empty match')
  t.equal(m.length, 0, 'zero-results')

  m = nlp('spencer is really cool')
  const r = m.match(['spencer', 'really']).toUpperCase()
  t.equal(r.out('text'), 'SPENCER REALLY', 'match-spencer-really')
  t.equal(r.length, 2, 'two-results')

  t.equal(m.out('text'), 'SPENCER is REALLY cool', 'match-spencer-really')
  t.equal(m.length, 1, 'still-one-result')
  t.end()
})
