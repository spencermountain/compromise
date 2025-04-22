import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/constructor] '

test('extra exports:', function (t) {
  t.ok(nlp.version, 'version number exported')

  t.doesNotThrow(function () {
    nlp.verbose(true)
    nlp.verbose(false)
  }, here + 'can set verbosity')

  t.end()
})

test('tokenize() runs without pos-tagging', function (t) {
  const str = 'Miss Hoover, I glued my head to my shoulder.'
  const r = nlp.tokenize(str)
  t.equal(r.out('text'), str, here + 'tokenize output is same')

  t.equal(r.length, 1, 'sentence-parser-working')
  const found = r.match('#Noun').found
  t.equal(found, false, here + 'no sneaky-tagging')

  t.end()
})

test('tokenize() does not crash on long string with many sentences', function (t) {
  let text = 'The quick brown fox jumped over the lazy dog.\n'
  text += 'Hi!\n'.repeat(100000)
  const _doc = nlp.tokenize(text) // eslint-disable-line
  t.ok(true, here + 'repeated hi')
  t.end()
})

test('tokenize() does not crash on long string with few sentences', function (t) {
  let text = 'The quick brown fox jumped over the lazy dog.\n'
  text += '--\n'.repeat(100000)
  const _doc = nlp.tokenize(text) // eslint-disable-line
  t.ok(true, here + 'repeated dashes')
  t.end()
})

test('parseMatch() results are symmetric', function (t) {
  const doc = nlp(`Why doesnt ross, the largest friend, simply eat the other 5?`)
  const matches = [
    '#MaleName the #Adjective friend',
    '^why',
    '#Value$',
    null,
    'why',
    '.',
    '. simply?',
    'simply eat',
    'tornado alley #Hoover',
  ]
  matches.forEach(str => {
    const regs = nlp.parseMatch(str)
    let a = doc.match(regs).json()
    let b = doc.match(str).json()
    a = JSON.stringify(a)
    b = JSON.stringify(b)
    t.equal(a, b, here + str)
  })
  t.end()
})
