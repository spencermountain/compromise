import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/random] '

test('random', t => {
  const doc = nlp('one two three four five six')
  const cases = [
    [undefined, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 6],
    [17, 6],
  ]
  cases.forEach(([size, expected]) => {
    const actual = doc.terms().random(size).out('array')
    t.equal(actual.length, expected, here + `size ${size}`)
  })
  t.end()
})

test('random-null', t => {
  const doc = nlp('toronto')
  const cases = [
    ['#Person', 0],
    ['toronto+', 1],
  ]
  cases.forEach(([pattern, expected]) => {
    const actual = doc.match(pattern).random(5).out('array')
    t.equal(actual.length, expected, here + pattern)
  })
  t.end()
})
