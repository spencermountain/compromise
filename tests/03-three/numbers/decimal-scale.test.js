import test from 'tape'
import nlp from '../lib.js'
const here = '[three/numbers/decimal-scale] '

test('decimals times a multiple are exact:', function (t) {
  const arr = [
    ['2.01 million', 2010000],
    ['4.07 thousand', 4070],
    ['1.07 billion', 1070000000],
    ['2.3 hundred thousand', 230000],
    ['minus 2.01 million', -2010000],
    ['2.01 million and 3', 2010003],
    ['two point zero one million', 2010000],
    ['one point three six thousand', 1360],
    ['six point nine four million', 6940000],
    ['1.5 dozen', 18],
  ]
  arr.forEach(([str, num]) => {
    t.deepEqual(nlp(str).numbers().get(), [num], here + str)
  })
  t.end()
})

test('spoken decimals are exact:', function (t) {
  const arr = [
    ['six point nine four', 6.94],
    ['minus four point nine four', -4.94],
    ['one thousand point zero five', 1000.05],
  ]
  arr.forEach(([str, num]) => {
    t.deepEqual(nlp(str).numbers().get(), [num], here + str)
  })
  t.end()
})

test('decimal money times a multiple:', function (t) {
  t.deepEqual(nlp('it cost $2.01 million').money().get(), [2010000], here + '$2.01 million')
  t.end()
})

test('decimal text round-trip:', function (t) {
  ;[6.94, 7.94, 2.01].forEach(num => {
    const str = nlp(String(num)).numbers().toText().text()
    t.deepEqual(nlp(str).numbers().get(), [num], here + str)
  })
  t.end()
})
