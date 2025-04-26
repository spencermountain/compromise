import test from 'tape'
import nlp from '../../_lib.js'
const here = '[three/number-overlap] '

test('number-fraction overlap', function (t) {
  const arr = [
    ['fifty five and two eighths', 55.25],
    ['two fifty five and a third', 255.333],
    ['two fifty five and five thirds', 256.667],
  ]

  arr.forEach((a) => {
    const doc = nlp(a[0])
    const values = doc.numbers().get()[0]
    const fractions = doc.fractions().get()[0]
    t.equal(values, a[1], here + 'Value: ' + a[0])
    t.equal(fractions, null, here + 'Fraction: no-fraction')
  })

  t.end()
})
