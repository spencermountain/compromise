const test = require('tape')
const nlp = require('../_lib')

test('match-capture-group', function (t) {
  let m = nlp('John eats glue').match('[john]', 0)
  t.equal(m.out('text'), 'John', 'capture-group-simple')

  m = nlp('John Smith eats glue').match('[#Person+]', 0)
  t.equal(m.out('text'), 'John Smith', 'capture-two')

  m = nlp('ralf eats the glue').match('ralf [#Verb] the', 0)
  t.equal(m.out('normal'), 'eats', 'simple subset')

  m = nlp('ralf eats the glue').match('[ralf] [#Verb] the', 0)
  t.equal(m.out('normal'), 'ralf', 'two-word capture')

  m = nlp('i saw ralf eat the glue Mrs. Hoover').match('ralf [#Verb the glue] mrs', 0)
  t.equal(m.out('normal'), 'eat the glue', 'three-word capture')

  m = nlp('ralf eats the glue').match('* [#Verb]', 0)
  t.equal(m.out('normal'), 'eats', 'capture after wildcard')

  m = nlp('saw the Toronto International Documentary Film Festival yesterday').match('saw the? [#Noun+] yesterday', 0)
  t.equal(m.trim().out('text'), 'Toronto International Documentary Film Festival', 'greedy capture')

  t.end()
})

test('optional capture', function (t) {
  let yup = nlp('hello world').match('hello [<found>world?]')
  t.equal(yup.found, true, 'found yes')
  t.equal(yup.groups('found').found, true, 'group found yes')
  let yup2 = nlp('hello world').match('hello [<found>world]?')
  t.equal(yup2.found, true, 'found yes2')
  t.equal(yup.groups('found').found, true, 'group found yes')

  let outside = nlp('hello nope').match('hello [<found>world]?')
  t.equal(outside.found, true, 'still found optional')
  t.equal(outside.groups('found').found, false, 'group found no')

  let inside = nlp('hello nope').match('hello [<found>world?]')
  t.equal(inside.found, true, 'still found optional')
  t.equal(inside.groups('found').found, false, 'group found no2')

  t.end()
})

test('tricky capture', function (t) {
  let doc = nlp.tokenize('during august')
  let m = doc.match('^(on|during|in) [.]', 0)
  t.equal(m.text('normal'), 'august', 'found capture')
  t.end()
})
