import test from 'tape'
import nlp from '../lib/_lib.js'

test('optional OR block', function (t) {
  let m = nlp('start two end').match('start (one|two) end')
  t.equal(m.text(), 'start two end', 'normal OR')

  m = nlp('start two end').match('start (one|two)? end')
  t.equal(m.text(), 'start two end', 'optional OR found')

  m = nlp('start end').match('start (one|two)? end')
  t.equal(m.text(), 'start end', 'optional OR not-found')

  m = nlp('start seven end').match('start (one|two)? end')
  t.equal(m.text(), '', 'optional OR missing')

  m = nlp('start three four end').match('start (one|two eight seven|three four)? end')
  t.equal(m.text(), 'start three four end', 'optional multi-OR found')

  m = nlp('start three four end').match('start (one|two|three seven)? end')
  t.equal(m.text(), '', 'optional multi-OR not-found')

  m = nlp('start three four end').match('start (foo|bar|#Value .)? end')
  t.equal(m.text(), 'start three four end', 'optional complex-block found')

  m = nlp('start three four end').match('start (foo|bar|wrong #Value)? end')
  t.equal(m.text(), '', 'optional complex-block not-found')

  t.end()
})

test('single OR block', function (t) {
  let m = nlp('start three four end').match('start (#Value four) end')
  t.equal(m.text(), 'start three four end', 'single complex-block found')

  m = nlp('start three four end').match('start (#Value four)? end')
  t.equal(m.text(), 'start three four end', 'single optional complex-block found')
  t.end()
})

test('not block', function (t) {
  let doc = nlp('before two words after')
  let m = doc.match(`before (#Value words) after`)
  t.equal(m.text(), 'before two words after', 'normally matches')

  m = doc.match(`before !(#Value words) after`)
  t.equal(m.text(), '', 'negative doesnt match')

  m = doc.match(`before (two && #Value) words after`)
  t.equal(m.text(), 'before two words after', 'AND matches')

  m = doc.match(`before !(two && #Value) words after`)
  t.equal(m.text(), '', 'negative AND doesnt match')

  m = doc.match(`before (foo|two|#Person) words after`)
  t.equal(m.text(), 'before two words after', 'OR matches')

  m = doc.match(`before !(foo|two|#Person) words after`)
  t.equal(m.text(), '', 'negative OR doesnt match')

  t.end()
})

test('greedy inside a block', function (t) {
  let doc = nlp('and foo foo')
  let m = doc.match('(and foo+)')
  t.equal(m.text(), 'and foo foo', 'greedy found two')

  doc = nlp('and foo foo foo bar foo ')
  m = doc.match('(and foo+)')
  t.equal(m.text(), 'and foo foo foo', 'greedy found three')

  doc = nlp('and foo otherwise foo')
  m = doc.match('(and foo+)')
  t.equal(m.text(), 'and foo', 'greedy found once')

  doc = nlp('and otherwise foo foo')
  m = doc.match('(and foo+)')
  t.equal(m.text(), '', 'greedy unfound')

  doc = nlp('and otherwise foo foo bar')
  m = doc.match('(and foo+)+')
  t.equal(m.text(), '', 'greedy outside and inside')

  doc = nlp('and otherwise foo foo bar')
  m = doc.match('(and foo)+')
  t.equal(m.text(), '', 'greedy outside')

  doc = nlp('and foo foo')
  m = doc.match('(and foo*?)')
  t.equal(m.text(), 'and foo foo', 'astrix optional')

  doc = nlp('and foo1 foo2 foo3 foo4 bar foo ')
  m = doc.match('(and /foo/+)')
  t.equal(m.text(), 'and foo1 foo2 foo3 foo4', 'greedy found four')

  t.end()
})

test('greedy OR block', function (t) {
  let doc = nlp('is walking')
  let m = doc.match('is (#Adverb|not)+? walking')
  t.equal(m.text(), 'is walking', 'greedy 0')
  m = doc.match('is (#Adverb|not)?+ walking')
  t.equal(m.text(), 'is walking', 'greedy 0 again')

  doc = nlp('is really walking')
  m = doc.match('is (#Adverb|not)+ walking')
  t.equal(m.text(), 'is really walking', 'greedy 1')

  doc = nlp('is really not walking')
  m = doc.match('is (#Adverb|not)+? walking')
  t.equal(m.text(), 'is really not walking', 'greedy 2')

  doc = nlp('is really not quickly walking')
  m = doc.match('is (#Adverb|not)+ walking')
  t.equal(m.text(), 'is really not quickly walking', 'greedy 3')

  doc = nlp('1 house, 2 boats, 3 farms')
  t.equal(doc.match(`(#Value .)`).length, 3, '3 non-greedy')
  t.equal(doc.match(`(#Value .)+`).length, 1, '1 greedy')

  t.end()
})
