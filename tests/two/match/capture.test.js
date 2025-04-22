import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/capture] '

test('match-capture-group', function (t) {
  let m = nlp('John eats glue').match('[john]', 0)
  t.equal(m.out('text'), 'John', here + 'capture-group-simple')

  m = nlp('John Smith eats glue').match('[#Person+]', 0)
  t.equal(m.out('text'), 'John Smith', here + 'capture-two')

  m = nlp('ralf eats the glue').match('ralf [#Verb] the', 0)
  t.equal(m.out('normal'), 'eats', here + 'simple subset')

  m = nlp('ralf eats the glue').match('[ralf] [#Verb] the', 0)
  t.equal(m.out('normal'), 'ralf', here + 'two-word capture')

  m = nlp('i saw ralf eat the glue Mrs. Hoover').match('ralf [#Verb the glue] mrs', 0)
  t.equal(m.out('normal'), 'eat the glue', here + 'three-word capture')

  m = nlp('ralf eats the glue').match('* [#Verb]', 0)
  t.equal(m.out('normal'), 'eats', here + 'capture after wildcard')

  m = nlp('saw the Toronto International Documentary Film Festival yesterday').match('saw the? [#Noun+] yesterday', 0)
  t.equal(m.out('text'), 'Toronto International Documentary Film Festival', here + 'greedy capture')

  t.end()
})

test('optional capture', function (t) {
  const yup = nlp('hello world').match('hello [<found>world?]')
  t.equal(yup.found, true, here + 'found yes')
  t.equal(yup.groups('found').found, true, here + 'group found yes')
  const yup2 = nlp('hello world').match('hello [<found>world]?')
  t.equal(yup2.found, true, here + 'found yes2')
  t.equal(yup.groups('found').found, true, here + 'group found yes')

  const outside = nlp('hello nope').match('hello [<found>world]?')
  t.equal(outside.found, true, here + 'still found optional')
  t.equal(outside.groups('found').found, false, here + 'group found no')

  const inside = nlp('hello nope').match('hello [<found>world?]')
  t.equal(inside.found, true, here + 'still found optional')
  t.equal(inside.groups('found').found, false, here + 'group found no2')

  t.end()
})

test('tricky capture', function (t) {
  let doc = nlp.tokenize('during august')
  let m = doc.match('^(on|during|in) [.]', 0)
  t.equal(m.text('normal'), 'august', here + 'found capture')

  // test for this weird non-match
  doc = nlp(`to foo`)
  m = doc.match('[.+] to')
  t.equal(m.text(), '', here + 'optional-group not found')
  // this is a creepy bug
  m = doc.match('[.+] to', 0)
  m.clone().text()
  t.ok(true, here + 'creepy-group bug')

  t.end()
})


test('optional capture', function (t) {
  const doc = nlp('sept 4 1998')
  let m = doc.match('[<month>#Month] [<date>#Value] [<year>#Year]?')
  t.equal(m.groups('year').found, true, here + '[]?')
  m = doc.match('[<month>#Month] [<date>#Value] [<year>#Year?]')
  t.equal(m.groups('year').found, true, here + '[?]')
  t.end()
})
