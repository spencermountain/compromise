import test from 'tape'
import nlp from '../../lib/two.js'
const here = '[two/match/fancy-match] '

test('matchOne', function (t) {
  const doc = nlp('one two three four five. one three four')
  const arr = doc.matchOne('three four').out('array')
  t.equal(arr.length, 1, 'one-match')
  t.equal(arr[0], 'three four', 'found-match')
  t.end()
})

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
  const doc = nlp(`spencer's house`)
  let m = doc.match('spencer')
  t.equal(m.found, true, here + 'possessive normal')

  m = doc.match('(spencer|foo)')
  t.equal(m.found, true, here + 'possessive in fast-OR')

  m = doc.match('(spencer|foo bar)')
  t.equal(m.found, true, here + 'possessive in slow-OR')
  t.end()
})

test('match-doc', function (t) {
  const doc = nlp('the boy and the girl.')
  const m = doc.match('(boy|girl)')
  const arr = doc.match(m).out('array')
  t.deepEqual(arr, ['boy', 'girl.'], here + 'match-doc')
  t.end()
})

test('match-doc-freeze', function (t) {
  const doc = nlp('the boy and the girl.')
  const m = doc.match('(boy|girl)')
  doc.prepend('ooh baby')
  const arr = doc.match(m).out('array')
  t.deepEqual(arr, ['boy', 'girl.'], here + 'match-doc-2')
  t.end()
})

test('match-term-id', function (t) {
  const doc = nlp('one two three')
  const two = doc.match('two')
  const id = two.json()[0].terms[0].id
  const m = doc.match([{ id: id }])
  t.ok(m.has('^two$'), here + 'match-id')
  t.end()
})
