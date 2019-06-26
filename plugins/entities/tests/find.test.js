var test = require('tape')
var nlp = require('./_lib')

test('misc', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.entities().length, 0, 'found no entities')

  doc = nlp(`john, bill, joe`)
  t.equal(doc.entities().length, 3, 'found three entities')
  t.equal(doc.people().length, 3, 'found three people')
  t.equal(doc.organizations().length, 0, 'found zero organizations')
  t.equal(doc.places().length, 0, 'found zero places')

  doc = nlp(`google and FedEx Inc`)
  t.equal(doc.organizations().length, 2, 'found two organizations')

  doc = nlp(`toronto and hamilton ontario.`)
  t.equal(doc.places().length, 2, 'found two places')
  t.end()
})
