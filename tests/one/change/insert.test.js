import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/insert] '

test('insert-basic :', function (t) {
  let m = nlp('the dog sat').insertBefore('and')
  t.equal(m.out('text'), 'and the dog sat', here + 'parent-before')

  m = nlp('the dog sat').insertAfter('patiently')
  t.equal(m.out('text'), 'the dog sat patiently', here + 'parent-after')

  m = nlp('the dog sat')
  m.match('dog').insertBefore('nice')
  t.equal(m.out('text'), 'the nice dog sat', here + 'match-before')

  m = nlp('a dog sat')
  m.match('sat').insertAfter('quickly')
  t.equal(m.out('text'), 'a dog sat quickly', here + 'match-after')

  m = nlp('a dog sat')
  m.match('a dog sat').insertAfter('quickly')
  t.equal(m.out('text'), 'a dog sat quickly', here + 'multi-match-after')

  m = nlp('a dog sat')
  m.match('asdf').insertAfter('no no no')
  t.equal(m.out('text'), 'a dog sat', here + 'insert-multi-after')

  t.end()
})

test('insert-subset-include :', function (t) {
  let m = nlp('the dog is nice')
  let sub = m.match('is')
  sub.insertAfter('really')
  // t.equal(sub.out('normal'), 'is really', here + 'after-parent')
  t.equal(m.out('normal'), 'the dog is really nice', here + 'after-grandparent')

  m = nlp('the dog climbed the fence')
  sub = m.match('climbed')
  sub.insertBefore('really')
  // t.equal(sub.out('normal'), 'really climbed', here + 'before-parent')
  t.equal(m.out('normal'), 'the dog really climbed the fence', here + 'before-grandparent')

  t.end()
})

test('titlecase change in insertBefore :', function (t) {
  let doc = nlp('walking is very cool')
  doc.match('^.').insertBefore('jogging')
  t.equal(doc.text(), 'jogging walking is very cool', here + 'non-titlecase')

  doc = nlp('Walking is very cool')
  doc.match('^.').insertBefore('jogging')
  t.equal(doc.text(), 'Jogging walking is very cool', here + 'titlecase')

  // doc = nlp('Toronto is very cool', { toronto: 'City' })
  // doc.match('^.').insertBefore('jogging')
  // t.equal(doc.text(), 'Jogging Toronto is very cool', here + 'two-titlecases')

  doc = nlp('I am very cool')
  doc.match('^.').insertBefore('jogging')
  t.equal(doc.text(), 'Jogging I am very cool', here + 'pronoun-titlecase')
  t.end()
})

test('insert document :', function (t) {
  const doc = nlp(`one two three`)
  const b = nlp('four')
  doc.append(b)
  t.equal(doc.text(), 'one two three four', here + 'doc appent')
  t.end()
})

test('punctuation edge-cases :', function (t) {
  let doc = nlp('before.').insertAfter('after')
  t.equal(doc.text(), 'before after.', here + 'period')

  doc = nlp('before...').insertAfter('after')
  t.equal(doc.text(), 'before after...', here + 'elipses')

  doc = nlp('before.?').insertAfter('after')
  t.equal(doc.text(), 'before after.?', here + 'period question-mark')

  doc = nlp('before?').insertAfter('after')
  t.equal(doc.text(), 'before after?', here + ' question-mark')
  t.end()
})

test('prepend shift-self :', function (t) {
  const doc = nlp('no self no')
  const m = doc.match('self')
  const res = m.prepend('before')
  t.equal(res.text(), 'before self', here + 'res has both')
  t.equal(m.text(), 'before self', here + 'self is before+self')
  t.end()
})

test('append shift-self :', function (t) {
  const doc = nlp('self')
  const m = doc.match('.')
  const res = m.append('after')
  t.equal(res.text(), 'self after', here + 'res has both')
  t.equal(m.text(), 'self after', here + 'self is self+after')
  t.end()
})

test('insert-multi :', function (t) {
  const doc = nlp('the boy and the girl. girl girl')
  const m = doc.match('(boy|girl)')
  m.insertAfter('cat')
  t.equal(doc.eq(0).text(), 'the boy cat and the girl cat.', here + 'insert multi')
  t.equal(doc.eq(1).text(), 'girl cat girl cat', here + 'insert consecutive')
  t.end()
})

test('insert doc :', function (t) {
  const doc = nlp('walk the plank')
  const doc2 = nlp('foo bar')
  doc.insertAfter(doc2.docs)
  t.equal(doc.text(), 'walk the plank foo bar', here + 'insert doc')
  t.equal(doc.match('plank foo').found, true, here + 'insert found')
  doc.prepend('oh yeah')
  t.equal(doc.match('oh yeah walk').found, true, here + 'prepend found')
  t.end()
})

test('insert repair :', function (t) {
  let doc = nlp(`foo middle foo`)
  doc.match('foo+').insertAfter('bar')
  t.equal(doc.text(), 'foo bar middle foo bar', 'insert-repair-1')

  doc = nlp(`foo foo middle foo`)
  doc.match('foo+').insertAfter('bar')
  t.equal(doc.text(), 'foo foo bar middle foo bar', 'insert-repair-2')

  doc = nlp(`foo foo middle foo foo`)
  doc.match('foo+').insertAfter('bar')
  t.equal(doc.text(), 'foo foo bar middle foo foo bar', 'insert-repair-3')

  doc = nlp(`before foo middle foo foo after foo`)
  doc.match('foo+').insertAfter('bar')
  t.equal(doc.text(), 'before foo bar middle foo foo bar after foo bar', 'insert-repair-4')
  t.end()
})

