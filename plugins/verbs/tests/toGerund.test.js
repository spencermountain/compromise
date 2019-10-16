const test = require('tape')
const nlp = require('./_lib')

test('verb-to-gerund:', function(t) {
  ;[
    ['walk', 'walking'],
    ['sing', 'singing'],
    ['win', 'winning'],
    ['will convert', 'converting'],
    ['see', 'seeing'],
    ['is', 'being'],
    ['was', 'being'],
    ['am', 'being'],
  ].forEach(function(a) {
    const str = nlp(a[0])
      .verbs()
      .toGerund()
      .out('normal')
    t.equal(str, a[1], str + ' -> ' + a[1])
  })
  t.end()
})
