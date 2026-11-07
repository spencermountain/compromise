import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/number-parse] '

// Numbers that parse to the wrong value. These lines fail today.

// words that do not parse come back as 0, instead of null
test(here + 'unparseable words', t => {
  t.equal(nlp('umpteenth').numbers().parse()[0].num, null, here + 'umpteenth')
  t.equal(nlp('thirds').numbers().parse()[0].num, null, here + 'thirds')
  t.end()
})

// a repeated multiplier is added, not multiplied
test(here + 'repeated multipliers', t => {
  t.deepEqual(nlp('a hundred million million').numbers().get(), [100000000000000], here + 'hundred million million')
  t.deepEqual(nlp('a million million').numbers().get(), [1000000000000], here + 'million million')
  t.end()
})

// 'half' splits away from the number it modifies
test(here + 'half-multiples', t => {
  t.deepEqual(nlp('a half million').numbers().get(), [500000], here + 'a half million')
  t.end()
})

// a decimal comma reads as a thousands separator
test(here + 'decimal comma', t => {
  t.deepEqual(nlp('1,5').numbers().get(), [1.5], here + '1,5')
  t.end()
})
