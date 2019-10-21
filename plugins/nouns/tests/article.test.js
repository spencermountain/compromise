const test = require('tape')
const nlp = require('./_lib')

test('.article():', function(t) {
  let arr = [
    ['duck', 'a'],
    ['eavesdropper', 'an'],
    ['alligator', 'an'],
    // ['hour', 'an'],
    ['NDA', 'an'],
    ['F.B.I', 'an'],
    ['N.D.A.', 'an'],
    ['eulogy', 'a'],
    ['ukalele', 'a'],
    ['skateboards', 'the'],
    ['John Smith', ''],
    ['Tony Danza', ''],
  ]
  arr.forEach(function(a) {
    const o = nlp(a[0])
      .tag('Noun')
      .nouns()
      .json()[0]
    const msg = a[0] + ' -> ' + o.article
    t.equal(o.article, a[1], msg)
  })
  t.end()
})
