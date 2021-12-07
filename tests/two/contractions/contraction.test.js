import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/contraction] '

test('tricky contractions', function (t) {
  let doc = nlp(`I’m `)
  doc.contractions().expand()
  t.equal(doc.text(), 'I am ', here + "i'm")

  doc = nlp(` i can’t `)
  doc.contractions().expand()
  t.equal(doc.text(), ' i can not ', here + "i can't")

  doc = nlp(`spencer’s clean`)
  doc.contractions().expand()
  t.equal(doc.text(), 'spencer is clean', here + "spencer's")

  doc = nlp(`wouldn’t be good`)
  doc.contractions().expand()
  t.equal(doc.text(), 'would not be good', here + 'wouldnt')

  doc = nlp(`what’d you see`)
  doc.contractions().expand()
  t.equal(doc.text(), 'what did you see', here + 'whatd')

  doc = nlp(`spencer’d go see`)
  doc.contractions().expand()
  t.equal(doc.text(), 'spencer would go see', here + 'spencerd')

  t.end()
})

test('contractions v possessive', function (t) {
  let doc = nlp("spencer's not cool")
  doc.contractions().expand()
  t.equal(doc.text(), 'spencer is not cool', 'adj contraction')

  doc = nlp("spencer's walk")
  doc.contractions().expand()
  t.equal(doc.text(), "spencer's walk", 'noun not contraction')

  doc = nlp("spencer's runs")
  doc.contractions().expand()
  t.equal(doc.text(), "spencer's runs", 'present-tense not contraction')
  t.end()
})

test('match contractions/possessives', function (t) {
  let doc = nlp(`i think it's spencer's`)
  t.equal(doc.has('it'), true, here + 'has it')
  t.equal(doc.has('spencer'), true, here + 'has spencer')
  t.equal(doc.has(`spencer's`), true, here + "has spencer's")
  t.equal(doc.has(`i'm`), false, here + 'not false-positive')
  t.equal(doc.has(`it'll`), false, here + 'not false-positive-2')
  t.end()
})

test('contraction whitespace', function (t) {
  let doc = nlp(`i didn't know.`)
  t.equal(doc.text(), `i didn't know.`, here + 'init-whitespace')

  doc.contractions().expand()
  t.equal(doc.text(), `i did not know.`, here + 'expanded-whitespace')

  doc = nlp(`i didn't.`)
  t.equal(doc.text(), `i didn't.`, here + 'init-period')

  doc.contractions().expand()
  t.equal(doc.text(), `i did not.`, here + 'expanded-period')

  t.end()
})

test('number-range', function (t) {
  let doc = nlp(`between 5-7.`)
  t.equal(doc.has('5 to 7'), true, here + 'range-preposition-match')
  t.equal(doc.has('#NumberRange'), true, here + 'has NumberRange tag')
  t.equal(doc.has('#Value'), true, here + 'has Value tag')

  let arr = nlp('1-2').contractions().expand().match('#Value').out('array')
  t.equal(arr.length, 2, here + 'found numbers')

  doc = nlp('20th-21st')
  t.equal(doc.has('#NumberRange'), true, 'ordinal has NumberRange tag')
  t.equal(doc.has('#Ordinal'), true, 'has Ordinal tag')
  arr = doc.contractions().expand().terms().out('array')
  t.deepEqual(arr, ['20th', 'to', '21st'], here + 'num-range expand')

  doc = nlp('4-5pm')
  t.equal(doc.has('#NumberRange'), true, 'time has NumberRange tag')
  t.equal(doc.has('#Ordinal'), false, 'time is not an Ordinal tag')
  arr = doc.contractions().expand().terms().out('array')
  t.deepEqual(arr, ['4', 'to', '5pm'], here + 'time-range expand')

  doc = nlp('3:45-11pm')
  t.equal(doc.has('#NumberRange'), true, 'time has NumberRange tag')
  t.equal(doc.has('#Time'), true, 'time tag')
  arr = doc.contractions().expand().terms().out('array')
  t.deepEqual(arr, ['3:45', 'to', '11pm'], here + 'time-range expand2')
  t.end()
})

test('number-range with spaces', function (t) {
  let doc = nlp('12 - 14')
  t.equal(doc.has('#Value to #NumberRange'), true, here + 'has NumberRange tags')
  t.equal(doc.text(), '12 - 14', here + 'text is normal')
  t.equal(doc.contractions().expand().text(), '12 to 14', here + 'contraction expands')

  doc = nlp('4 - 5pm')
  t.equal(doc.has('#Value to #NumberRange'), true, here + 'has NumberRange tags #2')
  t.equal(doc.text(), '4 - 5pm', here + 'text is proper #2')
  t.equal(doc.contractions().expand().text(), '4 to 5pm', here + 'contraction expands #2')

  t.end()
})

test('french-contraction', function (t) {
  let doc = nlp(`oh j'aime ca`)
  t.equal(doc.has('aime'), true, here + 'has verb')
  t.equal(doc.has('je'), true, here + 'has je')
  t.end()
})

test('replace-contraction', function (t) {
  let doc = nlp(`i'd walked`)
  doc.replace('had', 'foo')
  t.equal(doc.text(), `i foo walked`, here + 'replace-contraction')
  t.end()
})

test('remove-contraction', function (t) {
  let doc = nlp(`i'd walked`)
  doc.remove('had')
  t.equal(doc.text(), `i walked`, here + 'remove-contraction')
  t.end()
})

test('insert-contraction', function (t) {
  let doc = nlp(`i'd walked`)
  let m = doc.match('had')
  m.insertBefore('really')
  t.equal(doc.text(), `i really had walked`, here + 'insertBefore-contraction')

  doc = nlp(`i'd walked`)
  m = doc.match('i')
  m.insertAfter('really')
  t.equal(doc.text(), `i really had walked`, here + 'insertAfter-contraction')
  t.end()
})

test('split-contraction', function (t) {
  let doc = nlp(`i'd walked`)
  let m = doc.splitOn('had')
  t.deepEqual(m.out('array'), ['i', 'had', 'walked'], here + 'splitOn-contraction')
  t.end()
})
