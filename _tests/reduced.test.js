const test = require('tape')
const nlp = require('./_lib')

test('reduced matches', function (t) {
  let doc = nlp(`the donkey's hotel`)
  t.equals(doc.has('donkey'), true, 'apostrophe-s')

  doc = nlp(`the donkeys' hotel`)
  t.equals(doc.has('donkeys'), true, 's-apostrophe')

  t.end()
})
