const test = require('tape')
const nlp = require('./_lib')

test('clauses-parentheses:', function (t) {
  let m = nlp("i said, 'did you have to do that' and then left, like nothing happened (which it didn't).").clauses()
  t.equal(m.length, 5, 'found 5 clauses')
  t.equal(m.eq(0).text(), 'i said', 'clause 1')
  t.equal(m.eq(1).text(), `did you have to do that`, 'clause 2')
  t.equal(m.eq(2).text(), `and then left`, 'clause 3')
  t.equal(m.eq(3).text(), `like nothing happened`, 'clause 4')
  t.equal(m.eq(4).text(), `which it didn't`, 'clause 5')
  t.end()
})

test('clauses-commas:', function (t) {
  let doc = nlp(`in Toronto, Canada`).clauses()
  t.equal(doc.length, 1, 'place-comma')

  // doc = nlp(`July 4, 1776`).clauses()
  // t.equal(doc.length, 1, 'date-comma')

  doc = nlp(`“You have a spider on your nose!” my friend yelled.`).clauses()
  t.equal(doc.length, 2, 'found 2 clauses-1')
  t.end()
})

test('clauses-condition:', function (t) {
  let m = nlp('if you must, go to the basement').clauses()
  t.equal(m.length, 2, 'found 2 clauses2')
  t.equal(m.eq(0).text(), 'if you must', 'clause 1')
  t.equal(m.eq(1).text(), `go to the basement`, 'clause 2')
  t.end()
})

test('clauses-conjunction:', function (t) {
  let m = nlp(`it is cool but it is not`).clauses()
  t.equal(m.length, 2, 'found 2 clauses3')
  t.equal(m.eq(0).text(), 'it is cool', 'clause 1')
  t.equal(m.eq(1).text(), `but it is not`, 'clause 2')
  t.end()
})

test('clauses-list:', function (t) {
  let m = nlp('he is nice, cool and fun.').clauses()
  t.equal(m.length, 1, 'found 1 clause')
  t.equal(m.eq(0).text(), 'he is nice, cool and fun.', 'clause 1')
  t.end()
})

test('clauses-find:', function (t) {
  let doc = nlp(`...and my butt smells, and i like to kiss my own butt`)
  let m = doc.clauses().find(d => d.has('@hasEllipses'))
  let str = m.text('reduced')
  t.equal(str, 'and my butt smells', 'first clause')
  t.end()
})
