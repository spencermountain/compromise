const test = require('tape')
const nlp = require('./_lib')

test('number-fraction overlap', function (t) {
  let arr = [
    ['fifty five and two eighths', 55.25],
    ['two fifty five and a third', 255.333],
    ['two fifty five and five thirds', 256.667],
  ]

  arr.forEach((a) => {
    let doc = nlp(a[0])
    let values = doc.numbers().get(0)
    let fractions = doc.fractions().get(0)
    t.equal(values, a[1], '[Value]: ' + a[0])
    t.equal(fractions, null, '[Value]: no-fraction')
  })

  t.end()
})
