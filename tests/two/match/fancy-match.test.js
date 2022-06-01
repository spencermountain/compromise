import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/fancy-match] '

test('matchOne', function (t) {
  let doc = nlp('one two three four five. one three four')
  let arr = doc.matchOne('three four').out('array')
  t.equal(arr.length, 1, 'one-match')
  t.equal(arr[0], 'three four', 'found-match')
  t.end()
})

// test('match-from-array :', function (t) {
//   let m = nlp('spencer is really cool').match(['spencer'])
//   t.equal(m.out('normal'), 'spencer', 'just-spencer')
//   t.equal(m.length, 1, 'one-result')

//   m = nlp('spencer is really cool').match([])
//   t.equal(m.out('normal'), '', 'empty match')
//   t.equal(m.length, 0, 'zero-results')

//   m = nlp('spencer is really cool')
//   let r = m.match(['spencer', 'really']).toUpperCase()
//   t.equal(r.out('text'), 'SPENCER REALLY', 'match-spencer-really')
//   t.equal(r.length, 2, 'two-results')

//   t.equal(m.out('text'), 'SPENCER is REALLY cool', 'match-spencer-really')
//   t.equal(m.length, 1, 'still-one-result')
//   t.end()
// })

test('greedy-capture', function (t) {
  let m = nlp('so ralf and really eats the glue').match('* [eats] the', 0)
  t.equal(m.out('normal'), 'eats', here + 'one-captures')

  m = nlp('so ralf really, really eats the glue').match('[#Adverb+] eats the', 0)
  t.equal(m.out('normal'), 'really really', here + 'greedy-capture')

  m = nlp('so ralf and really eats the glue').match('* [eats the]', 0)
  t.equal(m.out('normal'), 'eats the', here + 'two-captures')

  m = nlp('so ralf really eats the glue').match('really [eats the] *', 0)
  t.equal(m.out('normal'), 'eats the', here + 'astrix after')

  m = nlp('so ralf really eats the glue').match('really * [eats the]', 0)
  t.equal(m.out('normal'), 'eats the', here + 'astrix is not necessary')
  t.end()
})

test('match-posessive', function (t) {
  let doc = nlp(`spencer's house`)
  let m = doc.match('spencer')
  t.equal(m.found, true, here + 'possessive normal')

  m = doc.match('(spencer|foo)')
  t.equal(m.found, true, here + 'possessive in fast-OR')

  m = doc.match('(spencer|foo bar)')
  t.equal(m.found, true, here + 'possessive in slow-OR')
  t.end()
})

test('match-doc', function (t) {
  let doc = nlp('the boy and the girl.')
  let m = doc.match('(boy|girl)')
  let arr = doc.match(m).out('array')
  t.deepEqual(arr, ['boy', 'girl.'], here + 'match-doc')
  t.end()
})

test('match-doc-freeze', function (t) {
  let doc = nlp('the boy and the girl.')
  let m = doc.match('(boy|girl)')
  doc.prepend('ooh baby')
  let arr = doc.match(m).out('array')
  t.deepEqual(arr, ['boy', 'girl.'], here + 'match-doc-2')
  t.end()
})
