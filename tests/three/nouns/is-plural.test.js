import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/noun-isPlural] '

test('isPlural:', function (t) {
  const arr = [
    ['octopus', false],
    ['tree', false],
    ['trees', true],
    ['i', false],
    ['mayor of chicago', false],
    ['mayors of chicago', true],
    ['octopus', false],
    ['octopi', true],
    ['eyebrow', false],
    ['eyebrows', true],
    ['child', false],
    ['children', true],
    ["spencer's", false],
    ["toronto's", false],
    ['circus', false],
    ['circuses', true],
    ['circuses', true],
    ["simpsons'", false],
    ["she's", false],
  ]
  arr.forEach(function (a) {
    const r = nlp(a[0]).nouns()
    const msg = a[0]
    t.equal(r.isPlural().found, a[1], here + msg)
  })
  t.end()
})
