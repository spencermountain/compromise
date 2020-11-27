const test = require('tape')
const nlp = require('../_lib')

test('tricky contractions', function (t) {
  let doc = nlp(`I’m `)
  doc.contractions().expand()
  t.equal(doc.text(), 'I am ', '')

  doc = nlp(` i can’t `)
  doc.contractions().expand()
  t.equal(doc.text(), ' i can not ', '')

  doc = nlp(`spencer’s clean`)
  doc.contractions().expand()
  t.equal(doc.text(), 'spencer is clean', '')

  doc = nlp(`wouldn’t be good`)
  doc.contractions().expand()
  t.equal(doc.text(), 'would not be good', '')

  doc = nlp(`what’d you see`)
  doc.contractions().expand()
  t.equal(doc.text(), 'what did you see', '')

  doc = nlp(`spencer’d go see`)
  doc.contractions().expand()
  t.equal(doc.text(), 'spencer would go see', '')

  t.end()
})

test('contractions v possessive', function (t) {
  let str = nlp("spencer's not cool").normalize({ contractions: true }).text()
  t.equal(str, 'spencer is not cool', 'adj contraction')

  str = nlp("spencer's walk").normalize({ contractions: true }).text()
  t.equal(str, "spencer's walk", 'noun not contraction')

  str = nlp("spencer's runs").normalize({ contractions: true }).text()
  t.equal(str, "spencer's runs", 'present-tense not contraction')
  t.end()
})

test('match contractions/possessives', function (t) {
  let doc = nlp(`i think it's spencer's`)
  t.equal(doc.has('it'), true, 'has it')
  t.equal(doc.has('spencer'), true, 'has spencer')
  t.equal(doc.has(`spencer's`), true, "has spencer's")
  t.equal(doc.has(`i'm`), false, 'not false-positive')
  t.equal(doc.has(`it'll`), false, 'not false-positive-2')
  t.end()
})

test('contraction whitespace', function (t) {
  let doc = nlp(`i didn't know.`)
  t.equal(doc.text(), `i didn't know.`, 'init-whitespace')

  doc.contractions().expand()
  t.equal(doc.text(), `i did not know.`, 'expanded-whitespace')

  doc = nlp(`i didn't.`)
  t.equal(doc.text(), `i didn't.`, 'init-period')

  doc.contractions().expand()
  t.equal(doc.text(), `i did not.`, 'expanded-period')

  t.end()
})

test('number-range', function (t) {
  let doc = nlp(`between 5-7.`)
  t.equal(doc.has('5 to 7'), true, 'range-preposition-match')
  t.equal(doc.has('#NumberRange'), true, 'has NumberRange tag')
  t.equal(doc.has('#Value'), true, 'has Value tag')

  let arr = nlp('1-2').contractions().expand().match('#Value').out('array')
  t.equal(arr.length, 2, 'found numbers')

  doc = nlp('20th-21st')
  t.equal(doc.has('#NumberRange'), true, 'ordinal has NumberRange tag')
  t.equal(doc.has('#Ordinal'), true, 'has Ordinal tag')
  arr = doc.contractions().expand().terms().out('array')
  t.deepEqual(arr, ['20th', 'to', '21st'])
  t.end()
})

test('french-contraction', function (t) {
  let doc = nlp(`oh j'aime ca`)
  t.equal(doc.has('aime'), true, 'has verb')
  t.equal(doc.has('je'), true, 'has je')
  t.end()
})
