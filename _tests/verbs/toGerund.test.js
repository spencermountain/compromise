const test = require('tape')
const nlp = require('../_lib')

test('verb-to-gerund:', function (t) {
  let arr = [
    ['walk', 'walking'],
    ['sing', 'singing'],
    ['win', 'winning'],
    ['will convert', 'converting'],
    ['see', 'seeing'],
    ['is', 'being'],
    ['was', 'being'],
    ['am', 'being'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).verbs().toGerund().out('normal')
    t.equal(str, a[1], a[0] + ' -> ' + str)
  })
  t.end()
})
