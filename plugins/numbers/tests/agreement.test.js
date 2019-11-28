const test = require('tape')
const nlp = require('./_lib')

test('misc agreement', function(t) {
  let doc = nlp('i ate 7 kilos of fruit')
    .numbers()
    .units()
  t.equal(doc.text('trim'), 'kilos', 'found unit')

  doc = nlp('i ate 7 of them, kilos are kilograms')
    .numbers()
    .units()
  t.equal(doc.text('trim'), '', 'found no unit')

  t.end()
})

test('ordinal agreement', function(t) {
  let doc = nlp('seventeen beers')
  doc.values().toOrdinal()
  t.equal(doc.text(), 'seventeenth beer')

  doc.values().toCardinal()
  t.equal(doc.text(), 'seventeen beers')
  t.end()
})
