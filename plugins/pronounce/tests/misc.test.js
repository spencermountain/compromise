const test = require('tape')
const nlp = require('./_lib')

test('default', function (t) {
  let doc = nlp('phil collins')
  let m = doc.pronounce({})
  t.equal(m[0].pronounce, 'fil kolins', 'fil kolins')
  t.end()
})
