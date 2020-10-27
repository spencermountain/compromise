const test = require('tape')
const nlp = require('../_lib')

test('verb-to-adjective:', function (t) {
  let arr = [
    ['walk', 'walkable'],
    ['sing', 'singable'],
    ['win', 'winnable'],
    ['convert', 'convertible'],
    ['see', 'visible'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).verbs().asAdjective()[0]
    t.equal(str, a[1], str + ' -> ' + a[1])
  })
  t.end()
})
