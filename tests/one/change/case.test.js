import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/case] '

test('sanity-check case:', function (t) {
  let str = 'John xoo, John fredman'
  const r = nlp(str)
  str = r.toUpperCase().out('text')
  t.equal(str, 'JOHN XOO, JOHN FREDMAN', here + 'uppercase')

  str = r.toLowerCase().out('text')
  t.equal(str, 'john xoo, john fredman', here + 'lowercase')

  str = r.toCamelCase().out('text')
  t.equal(str, 'johnXooJohnFredman', here + 'camelcase') //removes comma
  t.end()
})

test('camel case:', function (t) {
  const doc = nlp('and check this out! a walk-in microwave.')
  doc.match('walk in').toCamelCase()
  t.equal(doc.text(), 'and check this out! a walkIn microwave.', here + 'hyphenated-camelcase')
  t.end()
})

test('tricky case:', function (t) {
  let str = 'i am spencer kelly here with Amy Watson.'
  let r = nlp(str)
  r.match('(spencer|amy) .').toUpperCase()
  str = r.out('text')
  t.equal(str, 'i am SPENCER KELLY here with AMY WATSON.', here + 'tricky-uppercase')

  str = 'the Spencer Kelly Festival of Silly Walks'
  r = nlp(str)
  r.match('@isTitleCase+').toCamelCase()
  t.equal(r.out('text'), 'the SpencerKellyFestival of SillyWalks', here + 'tricky-camelcase')

  t.end()
})

test('unicode case:', function (t) {
  let doc = nlp(`ümasdfs`)
  doc.toTitleCase()
  t.equal(doc.text(), 'Ümasdfs', here + 'unicode-titlecase')

  doc = nlp(`Ümasdfs`)
  doc.toUpperCase()
  t.equal(doc.text(), 'ÜMASDFS', here + 'unicode-uppercase')
  doc.toLowerCase()
  t.equal(doc.text(), 'ümasdfs', here + 'unicode-lowercase')

  t.end()
})
