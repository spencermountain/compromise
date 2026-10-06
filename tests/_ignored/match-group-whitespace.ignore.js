import test from 'tape'
import nlp from '../two/_lib.js'
const here = '[ignored/match-group-whitespace] '

// Deferred: Parenthesized patterns with extra internal spaces do not match this phrase.
test(here + 'or-match-multi', function (t) {
  const doc = nlp('toronto and montreal. Sydney and Paris')
  const m = doc.match('(#Place  and montreal )')
  t.equal(m.out(), 'toronto and montreal', 'whitespace-or')
  t.end()
})
