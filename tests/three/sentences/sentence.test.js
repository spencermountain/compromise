import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentence] '

test('get full sentence:', function (t) {
  let doc = nlp('one two foo four five. i saw foo house. I ate a sandwhich. Foo was nice')

  let m = doc.match('foo')

  let str = m.eq(0).sentences().text()
  t.equal(str, doc.sentences(0).text(), here + 'first-full-sentence')

  str = m.eq(1).sentences().text()
  t.equal(str, doc.sentences(1).text(), here + 'second-full-sentence')

  str = m.eq(2).sentences().text()
  t.equal(str, doc.sentences(3).text(), here + 'third-full-sentence')

  t.end()
})

test('get multiple-copies of one sentence:', function (t) {
  let doc = nlp('John Smith was cool. I am missing. Cindy Lauper and Carl Sagan here. I am also missing.')
  let m = doc.match('#Person+')
  let matches = m.sentences()
  let arr = matches.out('array')
  t.equal(arr.length, 3, here + 'two sentences into three results')
  t.equal(arr[0], 'John Smith was cool.', here + 'one person sentence #1')
  t.equal(arr[1], 'Cindy Lauper and Carl Sagan here.', here + 'two person sentence #1')
  t.equal(arr[2], 'Cindy Lauper and Carl Sagan here.', here + 'two person sentence #2')
  t.end()
})
