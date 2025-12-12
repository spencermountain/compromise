import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/wordcount] '

test('==WordCount==', function (t) {
  const arr = [
    ['he is good', 3],
    ['jack and jill went up the hill.', 7],
    ['Mr. Clinton did so.', 4],
    ['Bill Clinton ate cheese.', 4],
    ['5kb of data.', 3],
    ['it was five hundred and seventy two.', 7],
    ['jack and jill went up the hill. They got water.', 10],
    ['Bill Clinton went walking', 4],
    ['Bill Clinton will go walking', 5],
    [`is not isn't. it sure is.`, 6],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    t.equal(doc.wordCount(), a[1], here + a[0])
  })
  t.end()
})

test('match-wordcount', function (t) {
  const doc = nlp("he is cool. she is nice. it isn't here.")
  t.equal(doc.eq(1).wordCount(), 3, here + 'middle-sentence')
  t.equal(doc.match('(he|she)').wordCount(), 2, here + 'he/she match')
  t.equal(doc.match('is').wordCount(), 3, here + 'is-contraction match')
  //i guess!?
  t.equal(doc.match('not').wordCount(), 0, here + 'not-contraction match')
  t.equal(doc.match('not').length, 1, here + 'length-vs-wordCount')
  t.end()
})
