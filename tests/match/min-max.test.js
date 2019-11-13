const test = require('tape')
const nlp = require('../_lib')

test('match min-max', function(t) {
  let doc = nlp('hello1 one hello2').match('#Value{7,9}')
  t.equal(doc.out(), '', 'match was too short')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3}')
  t.equal(doc.out(), 'one two three', 'exactly three')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3,3}')
  t.equal(doc.out(), 'one two three', 'still exactly three')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3,}')
  t.equal(doc.out(), 'one two three four five', 'minimum three')

  doc = nlp('hello1 one two three four five hello2').match('hello1 .{3}')
  t.equal(doc.out(), 'hello1 one two three', 'unspecific greedy exact length')

  doc = nlp('hello1 one two').match('hello1 .{3}')
  t.equal(doc.out(), '', 'unspecific greedy not long enough')

  t.end()
})
