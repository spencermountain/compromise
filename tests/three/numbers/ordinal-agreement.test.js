import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/number-agreement] '

test(here + 'ordinal and cardinal round trips', t => {
  const cases = [
    ['seventeen beers', 'seventeenth beer'],
    ['two children', 'second child'],
    ['three women', 'third woman'],
    ['five mice', 'fifth mouse'],
    ['21 boxes', '21st box'],
    ['two red cars', 'second red car'],
    ['three very old houses', 'third very old house'],
    ['two bottles of wine', 'second bottle of wine'],
    ['one beer', 'first beer'],
    ['zero beers', 'zeroth beer'],
    ['two sheep', 'second sheep'],
    ['two beers and three wines', 'second beer and third wine'],
  ]
  cases.forEach(([cardinal, ordinal]) => {
    const doc = nlp(cardinal)
    doc.numbers().toOrdinal()
    t.equal(doc.text(), ordinal, here + cardinal)
    doc.numbers().toOrdinal()
    t.equal(doc.text(), ordinal, here + 'ordinal idempotence')
    doc.numbers().toCardinal()
    t.equal(doc.text(), cardinal, here + 'round trip')
    doc.numbers().toCardinal()
    t.equal(doc.text(), cardinal, here + 'cardinal idempotence')
  })
  t.end()
})

test(here + 'cardinal agreement from ordinals', t => {
  const cases = [
    ['second child', 'two children'],
    ['first box', 'one box'],
    ['21st red car', '21 red cars'],
    ['zeroth bottle', 'zero bottles'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.numbers().toCardinal()
    t.equal(doc.text(), expected, here + input)
  })
  t.end()
})

test(here + 'agreement respects phrase and selection boundaries', t => {
  const cases = [
    ['two. Children play.', 'second. Children play.'],
    ['two, children play.', 'second, children play.'],
    ['two of the children', 'second of the children'],
    ['two cats chase mice', 'second cat chase mice'],
    ['two bottles of wines', 'second bottle of wines'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.numbers().toOrdinal()
    t.equal(doc.text(), expected, here + input)
  })
  const doc = nlp('two cats and three dogs')
  doc.numbers().eq(1).toOrdinal()
  t.equal(doc.text(), 'two cats and third dog', here + 'selected number')
  t.end()
})

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
