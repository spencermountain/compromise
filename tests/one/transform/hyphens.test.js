import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/hyphens] '

test('hyphen-tokenize', function (t) {
  let r = nlp('super-cool work')
  t.equal(r.terms().length, 3, here + 'super, cool')
  t.equal(r.out('text'), 'super-cool work', here + 'preserve hyphen')
  t.equal(r.out('normal'), 'super cool work', here + 'normalize-out hyphen')

  r = nlp('http://about.com/my-summer-vacation')
  t.equal(r.terms().length, 1, here + 'url hyphen')
  r = nlp('http://about.com/my-summer')
  t.equal(r.terms().length, 1, here + 'url hyphen2')

  r = nlp('421-0059')
  t.equal(r.terms().length, 1, here + 'phoneNuumber hyphen')

  r = nlp('sept-2')
  t.equal(r.terms().length, 2, here + 'date hyphen')

  r = nlp('-2 degrees')
  t.equal(r.terms().length, 2, here + 'minus hyphen')

  r = nlp('re-enactment')
  t.equal(r.out('machine'), 'reenactment', here + 're-hyphen')
  r = nlp('un-do')
  t.equal(r.out('machine'), 'undo', here + 'un-hyphen')

  t.end()
})

test('hyphenate', function (t) {
  let str = 'it is cool. he is nice'
  let m = nlp(str)
  m.hyphenate()
  t.equal(m.terms().length, 6, here + 'seperate terms')
  t.equal(m.out('text'), 'it-is-cool. he-is-nice', here + 'hyphenate')
  m.dehyphenate()
  t.equal(m.out('text'), str, here + 'dehyphenate')

  str = 'i payed seven-hundred for the sandwich'
  m = nlp(str)
  m.match('(seven|hundred)').dehyphenate()
  t.equal(m.out('text'), 'i payed seven hundred for the sandwich', here + 'dehyphenate-values')

  str = 'he is the king of rock. she is the queen of cool.'
  m = nlp(str)
  m.match('(king|queen) of (cool|rock)').hyphenate()
  t.equal(m.text(), 'he is the king-of-rock. she is the queen-of-cool.', here + 'hyphenate-match')

  t.end()
})

test('hasHyphen', function (t) {
  let doc = nlp(`super-cool and hunky-dory. Connected with-a-dash.`)
  let arr = doc.match('@hasHyphen+ .').out('array')
  t.equal(arr.length, 3, here + 'three found')
  t.equal(arr[0], 'super-cool', here + 'first found')
  t.equal(arr[1], 'hunky-dory.', here + 'second found')
  // t.equal(arr[2], 'with-a-dash', 'third found') //FIXME:hyphens
  t.end()
})
