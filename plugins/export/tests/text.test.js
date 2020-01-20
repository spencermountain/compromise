const test = require('tape')
const nlp = require('./_lib')
const sotu = require('./_sotu-8')
const isEqual = require('./_isEqual')

test('import/export sotu-8', function(t) {
  let a = nlp(sotu)
  // console.log('sotu -', sotu.length)
  // console.log('export -', JSON.stringify(a.export(), null, 0).length)
  let json = a.export()
  let b = nlp.import(json)

  t.equal(a.text(), b.text(), 'imported text-same')
  isEqual(a, b, t)
  t.end()
})
