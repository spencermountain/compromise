const test = require('tape')
const nlp = require('./_lib')

test('get full sentence:', function(t) {
  let doc = nlp('one two foo four five. i saw foo house. I ate a sandwhich. Foo was nice')

  let m = doc.match('foo')

  let str = m
    .eq(0)
    .sentence()
    .text()
  t.equal(str, doc.sentences(0).text(), 'first-full-sentence')

  str = m
    .eq(1)
    .sentence()
    .text()
  t.equal(str, doc.sentences(1).text(), 'second-full-sentence')

  str = m
    .eq(2)
    .sentence()
    .text()
  t.equal(str, doc.sentences(3).text(), 'third-full-sentence')

  t.end()
})
