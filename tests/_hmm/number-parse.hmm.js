import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/number-parse] '

// Numbers that parse to the wrong value. These lines fail today.

// a decimal comma reads as a thousands separator
test(here + 'decimal comma', t => {
  t.deepEqual(nlp('1,5').numbers().get(), [1.5], here + '1,5')
  t.end()
})

// a spoken decimal with no leading zero
test(here + 'bare point', t => {
  t.deepEqual(nlp('point five').numbers().get(), [0.5], here + 'point five')
  t.deepEqual(nlp('point five percent').numbers().get(), [0.5], here + 'point five percent')
  t.end()
})

// letter suffixes for thousand, million and billion
test(here + 'letter multipliers', t => {
  t.deepEqual(nlp('100k').numbers().get(), [100000], here + '100k')
  t.deepEqual(nlp('2M').numbers().get(), [2000000], here + '2M')
  t.deepEqual(nlp('5bn').numbers().get(), [5000000000], here + '5bn')
  t.end()
})

// a vague count before a multiplier is not a number
test(here + 'vague multiples', t => {
  t.equal(nlp('several hundred').numbers().found, false, here + 'several hundred')
  t.deepEqual(nlp('a couple hundred').numbers().get(), [200], here + 'a couple hundred')
  t.end()
})

// indian english multipliers
test(here + 'lakh and crore', t => {
  t.deepEqual(nlp('one lakh').numbers().get(), [100000], here + 'one lakh')
  t.deepEqual(nlp('two crore').numbers().get(), [20000000], here + 'two crore')
  t.end()
})

// space-grouped thousands
test(here + 'space grouping', t => {
  t.deepEqual(nlp('1 000 000').numbers().get(), [1000000], here + '1 000 000')
  t.end()
})
