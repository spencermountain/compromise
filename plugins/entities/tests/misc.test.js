const test = require('tape')
const nlp = require('./_lib')

test('misc entities', function(t) {
  let doc = nlp('The Children are right to laugh at you, Ralph')
  let m = doc.people()
  t.equal(m.length, 1, 'one person')

  m = doc.places()
  t.equal(m.length, 0, 'no places')

  m = doc.organizations()
  t.equal(m.length, 0, 'no organizations')

  m = doc.entities()
  t.equal(m.length, 1, 'one entity')
  t.end()
})
