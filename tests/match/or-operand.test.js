const test = require('tape')
const nlp = require('../_lib')

test('or-match-basic', function (t) {
  let doc = nlp('toronto and montreal. Sydney and Paris')
  let m = doc.match('(#Place  | and )')
  t.equal(m.out(), 'toronto and montreal. Sydney and Paris', 'whitespace-or')

  m = doc.match('(#Place  | nonono no no| and )')
  t.equal(m.out(), 'toronto and montreal. Sydney and Paris', 'whitespace-or-multi1')

  m = doc.match('( nonono no no|| . )')
  t.equal(m.out(), 'toronto and montreal. Sydney and Paris', 'whitespace-or-dot')
  t.end()
})

// test('or-match-multi', function(t) {
//   let doc = nlp('toronto and montreal. Sydney and Paris')
//   let m = doc.match('(#Place  and montreal )')
//   t.equal(m.out(), 'toronto and montreal', 'whitespace-or')
//   t.end()
// })
