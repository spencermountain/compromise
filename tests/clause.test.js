const test = require('tape')
const nlp = require('./_lib')

test('clauses-parentheses:', function(t) {
  let m = nlp("i said, 'did you have to do that' and then left, like nothing happened (which it didn't).").clauses()
  t.equal(m.length, 5, 'found 5 clauses')
  t.equal(m.eq(0).text(), 'i said', 'clause 1')
  t.equal(m.eq(1).text(), `did you have to do that`, 'clause 2')
  t.equal(m.eq(2).text(), `and then left`, 'clause 3')
  t.equal(m.eq(3).text(), `like nothing happened`, 'clause 4')
  t.equal(m.eq(4).text(), `which it didn't`, 'clause 5')
  t.end()
})

test('clauses-condition:', function(t) {
  let m = nlp('if you must, go to the basement').clauses()
  t.equal(m.length, 2, 'found 2 clauses')
  t.equal(m.eq(0).text(), 'if you must', 'clause 1')
  t.equal(m.eq(1).text(), `go to the basement`, 'clause 2')
  t.end()
})

test('clauses-list:', function(t) {
  let m = nlp('he is nice, cool and fun.').clauses()
  t.equal(m.length, 1, 'found 1 clause')
  t.equal(m.eq(0).text(), 'he is nice, cool and fun.', 'clause 1')
  t.end()
})
