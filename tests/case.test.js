const test = require('tape')
const nlp = require('./_lib')

test('sanity-check case:', function (t) {
  let str = 'John xoo, John fredman'
  let r = nlp(str)
  str = r.toUpperCase().out('text')
  t.equal(str, 'JOHN XOO, JOHN FREDMAN', 'uppercase')

  str = r.toLowerCase().out('text')
  t.equal(str, 'john xoo, john fredman', 'lowercase')

  str = r.toCamelCase().out('text')
  t.equal(str, 'johnXooJohnFredman', 'camelcase') //removes comma
  t.end()
})

test('camel case:', function (t) {
  let doc = nlp('and check this out! a walk-in microwave.')
  doc.hyphenated().toCamelCase()
  t.equal(doc.text(), 'and check this out! a walkIn microwave.', 'hyphenated-camelcase')
  t.end()
})

test('tricky case:', function (t) {
  let str = 'i am spencer kelly here with Amy Adams.'
  let r = nlp(str)
  r.match('#Person').toUpperCase()
  str = r.out('text')
  t.equal(str, 'i am SPENCER KELLY here with AMY ADAMS.', 'tricky-uppercase')

  str = 'the Spencer Kelly Festival of Silly Walks'
  r = nlp(str)
  r.match('@titleCase+').toCamelCase()
  t.equal(r.out('text'), 'the SpencerKellyFestival of SillyWalks', 'tricky-camelcase')

  t.end()
})

test('unicode case:', function (t) {
  let doc = nlp(`ümasdfs`)
  doc.toTitleCase()
  t.equal(doc.text(), 'Ümasdfs', 'unicode-titlecase')

  doc = nlp(`Ümasdfs`)
  doc.toUpperCase()
  t.equal(doc.text(), 'ÜMASDFS', 'unicode-uppercase')
  doc.toLowerCase()
  t.equal(doc.text(), 'ümasdfs', 'unicode-lowercase')

  t.end()
})
