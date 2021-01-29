const test = require('tape')
const nlp = require('../_lib')

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

  t.end()
})
