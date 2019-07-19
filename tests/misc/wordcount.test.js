var test = require('tape')
var nlp = require('../_lib')

test('==WordCount==', function(t) {
  ;[
    ['he is good', 3],
    ['jack and jill went up the hill.', 7],
    ['Mr. Clinton did so.', 4],
    ['Bill Clinton ate cheese.', 4],
    ['5kb of data.', 3],
    ['it was five hundred and seventy two.', 7],
    ['jack and jill went up the hill. They got water.', 10],
    ['Bill Clinton went walking', 4],
    ['Bill Clinton will go walking', 5],
  ].forEach(function(a) {
    var num = nlp(a[0]).terms().length
    t.equal(num, a[1], a[0])
  })
  t.end()
})
