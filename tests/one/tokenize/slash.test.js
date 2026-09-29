import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/slash] '

test('slash whitespace', function (t) {
  let str = 'left his / her backpack '
  let doc = nlp(str)
  t.equal(doc.out(), str, here + 'slash with normal spaces')

  str = 'left   his/her  backpack '
  doc = nlp(str)
  t.equal(doc.out(), str, here + 'slash with no spaces')

  str = 'left  his  /  her  backpack'
  doc = nlp(str)
  t.equal(doc.out(), str, here + 'slash with lots of spaces')
  t.end()
})

test('slash match', function (t) {
  let str = 'left his / her backpack '
  let doc = nlp(str)
  t.equal(doc.has('his'), true, here + 'slash with normal spaces - his')
  t.equal(doc.has('her'), true, here + 'slash with normal spaces - her')
  // t.equal(doc.has('his / her'), true, 'slash with normal spaces - his / her')

  str = 'left   his/her  backpack '
  doc = nlp(str)
  t.equal(doc.has('his'), true, here + 'slash with no spaces - his')
  t.equal(doc.has('her'), true, here + 'slash with no spaces - her')
  t.equal(doc.has('his/her'), true, here + 'slash with no spaces - his/her')

  str = 'left  his  /  her  backpack'
  doc = nlp(str)
  t.equal(doc.has('his'), true, here + 'slash with lots of spaces')
  t.equal(doc.has('her'), true, here + 'slash with lots of spaces')

  str = 'left   his/her/their  backpack '
  doc = nlp(str)
  t.equal(doc.has('his'), true, here + 'three-slash - his')
  t.equal(doc.has('her'), true, here + 'three-slash - her')
  t.equal(doc.has('their'), true, here + 'three-slash - their')
  t.equal(doc.has('his/her/their'), true, here + 'three-slash - his/her/their ')
  // t.equal(doc.has('#SlashedTerm'), true, here + 'SlashedTerm tag')

  t.end()
})
