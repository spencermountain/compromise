import test from 'tape'
import nlp from './_lib.js'
const here = '[one/match] '

const arr = [
  ['cold', '{cold/temperature}'],
  ['cold demeanor', '{cold/attitude}'],
  ['he will plug his book', '{plug/sell}'],
]
test('match:', function (t) {
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    const msg = `'${(a[0] + "' ").padEnd(20, '.')}  - '${a[1]}'`
    t.equal(doc.has(a[1]), true, here + msg)
  })
  t.end()
})
