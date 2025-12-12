import test from 'tape'
import nlp from '../../_lib.js'
const here = '[three/number-agreement] '

test('misc agreement', function (t) {
  let doc = nlp('i ate 7 kilos of fruit')
    .numbers()
    .units()
  t.equal(doc.text('trim'), 'kilos', here + 'found unit')

  doc = nlp('i ate 7 of them, kilos are kilograms')
    .numbers()
    .units()
  t.equal(doc.text('trim'), '', here + 'found no unit')

  t.end()
})

test('ordinal agreement', function (t) {
  const doc = nlp('seventeen beers')
  doc.values().toOrdinal()
  t.equal(doc.text(), 'seventeenth beer', here + 'ord-agreement')

  doc.values().toCardinal()
  t.equal(doc.text(), 'seventeen beers', here + 'card-agreement')
  t.end()
})
