const test = require('tape')
const nlp = require('./_lib')

test('lookup tests', function(t) {
  let doc = nlp("he isn't AT Spencer's house of pain. The haunted house of not pain. Third sentence spencer.")
  let m = doc.lookup(['house of pain', 'house of'])
  t.equal(m.length, 3, 'found redundant match')

  m = doc.lookup(["spencer's"])
  t.equal(m.length, 1, 'found possessive lookup')

  m = doc.lookup('spencer')
  t.equal(m.length, 2, 'end of line lookup')

  t.end()
})
