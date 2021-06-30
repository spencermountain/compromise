const test = require('tape')
const nlp = require('./_lib')

test('remove-everything-basic', function (t) {
  let doc = nlp(`2pm`)
  doc.remove('#Time')
  t.equal(doc.text(), '', 'empty-text')
  t.equal(doc.length, 0, '0-length')
  t.equal(doc.found, false, 'not-found')

  doc.remove('.')
  t.equal(doc.found, false, 'still-not-found')
  t.end()
})

test('remove-everything-nested', function (t) {
  let doc = nlp(`see term. term. term after.`)
  t.equal(doc.length, 3, 'start-3')

  doc.remove('term')
  t.equal(doc.length, 2, 'only-2 now')

  doc.remove('after')
  t.equal(doc.length, 1, 'only-1 now')

  doc.remove('.')
  t.equal(doc.length, 0, '0 now')
  t.equal(doc.found, false, 'not-found')

  doc.remove('.')
  t.equal(doc.found, false, 'still-not-found')

  t.end()
})
