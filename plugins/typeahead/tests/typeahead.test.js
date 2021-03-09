const test = require('tape')
const nlp = require('./_lib')

test('typeahead test', function (t) {
  const lexicon = {
    bedfordshire: 'Town',
    aberdeenshire: 'Town',
    buckinghamshire: 'Town',
    argyllshire: 'Town',
    bambridgeshire: 'Town',
    cheshire: 'Town',
    ayrshire: 'Town',
  }
  // add the words we should predict from
  nlp.typeahead(lexicon, { min: 4 })
  // create a document
  let doc = nlp('i went to bucking', lexicon)
  let m = doc.match('buckinghamshire')
  t.equal(m.text(), 'bucking', 'found partial')
  t.equal(m.text('implicit'), 'buckinghamshire', 'found full')

  // match by tag, too
  m = doc.match('#Town')
  t.equal(m.text(), 'bucking', 'found partial')
  t.equal(m.text('implicit'), 'buckinghamshire', 'found full')

  doc = nlp('buck')
  t.equal(doc.has('buckinghamshire'), true, 'found 4-letters')
  doc = nlp('buc')
  t.equal(doc.has('buckinghamshire'), false, 'not-found 3-letters')
  t.end()
})
