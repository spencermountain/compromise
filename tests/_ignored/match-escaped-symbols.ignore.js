import test from 'tape'
import nlp from '../lib/one.js'
const here = '[ignored/match-escaped-symbols] '

// Deferred: Escaped literal asterisks and plus signs do not match these punctuation terms.
test(here + 'encoding-match:', function (t) {
  let r = nlp('it is * nice')
  let str = r.match('is \\*').out().trim()
  t.equal(str, 'is *', 'encode asterix')

  r = nlp('it is + nice');
  str = r.match('is \\+ nice').trim().out();
  t.equal(str, 'is + nice', 'encode plus');

  t.end()
})
