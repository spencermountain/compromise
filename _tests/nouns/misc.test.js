const test = require('tape')
const nlp = require('../_lib')

test('misc nouns', function (t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.nouns().length, 0, 'found no nouns')

  doc = nlp(`john smith, and then Google Inc in Flordia`)
  t.equal(doc.nouns().length, 3, 'found three nouns')

  doc = nlp(`Chocolate microscope?`)
  doc.nouns().toPlural()
  t.equal(doc.text(), 'Chocolate microscopes?', 'plural')
  doc.nouns().toSingular()
  t.equal(doc.text(), 'Chocolate microscope?', 'singular')

  t.end()
})
