import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/number-parse] '

// Numbers that parse to the wrong value. These lines fail today.

// a numeric sign is treated as a prefix, and dropped from the value
test(here + 'negative numerals', t => {
  t.deepEqual(nlp('-5').numbers().get(), [-5], here + '-5')
  t.deepEqual(nlp('-1.5').numbers().get(), [-1.5], here + '-1.5')
  t.deepEqual(nlp('it was -20 degrees').numbers().get(), [-20], here + '-20 degrees')
  t.end()
})

// a slash-fraction returns only its numerator
test(here + 'slash fractions', t => {
  t.deepEqual(nlp('1/2').numbers().get(), [0.5], here + '1/2')
  t.deepEqual(nlp('12/40').numbers().get(), [0.3], here + '12/40')
  t.deepEqual(nlp('3/4ths').numbers().get(), [0.75], here + '3/4ths')
  t.end()
})

// words that do not parse come back as 0, instead of null
test(here + 'unparseable words', t => {
  t.equal(nlp('thousands').numbers().parse()[0].num, null, here + 'thousands')
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
