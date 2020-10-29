const test = require('tape')
const nlp = require('./_lib')

test('slash whitespace', function (t) {
  let str = 'left his / her backpack '
  let doc = nlp(str)
  t.equal(doc.out(), str, 'slash with normal spaces')

  str = 'left   his/her  backpack '
  doc = nlp(str)
  t.equal(doc.out(), str, 'slash with no spaces')

  str = 'left  his  /  her  backpack'
  doc = nlp(str)
  t.equal(doc.out(), str, 'slash with lots of spaces')
  t.end()
})

test('slash match', function (t) {
  let str = 'left his / her backpack '
  let doc = nlp(str)
  t.equal(doc.has('his'), true, 'slash with normal spaces - his')
  t.equal(doc.has('her'), true, 'slash with normal spaces - her')
  // t.equal(doc.has('his / her'), true, 'slash with normal spaces - his / her')

  str = 'left   his/her  backpack '
  doc = nlp(str)
  t.equal(doc.has('his'), true, 'slash with no spaces - his')
  t.equal(doc.has('her'), true, 'slash with no spaces - her')
  t.equal(doc.has('his/her'), true, 'slash with no spaces - his/her')

  str = 'left  his  /  her  backpack'
  doc = nlp(str)
  t.equal(doc.has('his'), true, 'slash with lots of spaces')
  t.equal(doc.has('her'), true, 'slash with lots of spaces')

  str = 'left   his/her/their  backpack '
  doc = nlp(str)
  t.equal(doc.has('his'), true, 'three-slash - his')
  t.equal(doc.has('her'), true, 'three-slash - her')
  t.equal(doc.has('their'), true, 'three-slash - their')
  t.equal(doc.has('his/her/their'), true, 'three-slash - his/her/their ')

  t.end()
})
