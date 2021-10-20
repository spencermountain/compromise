const test = require('tape')
const nlp = require('./_lib')

test('hash has whitespace', function(t) {
  let doc = nlp(`He isn't... working  `)
  doc.normalize({
    case: false,
    punctuation: true,
    contractions: false,
  })
  t.equal(nlp('he is not working').hash() === doc.hash(), false, 'whitespace changes hash')
  t.end()
})

test('hash isEqual', function(t) {
  let docA = nlp('hello there')
  let docB = nlp('hello there')
  t.equal(docA.isEqual(docB), true, 'both are equal')

  docB.match('hello').tag('Greeting')
  t.equal(docA.isEqual(docB), false, 'hashes not equal after tag')
  t.end()
})
