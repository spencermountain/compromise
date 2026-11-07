import test from 'tape'
import nlp from '../lib.js'
const here = '[three/numbers/negative-and-slash] '

test('negative numerals parse:', function (t) {
  const arr = [
    ['-5', -5],
    ['-1.5', -1.5],
    ['it was -20 degrees', -20],
    ['(-5)', -5],
    ['−5', -5],
    ['-.25', -0.25],
    ['-5%', -5],
    ['-$5', -5],
    ['$-5', -5],
    ['+5', 5],
    ['-0', 0],
  ]
  arr.forEach(([str, num]) => {
    t.deepEqual(nlp(str).numbers().get(), [num], here + str)
  })
  t.end()
})

test('negative numerals convert:', function (t) {
  let doc = nlp('-5 is cold')
  doc.numbers().toText()
  t.equal(doc.text(), 'minus five is cold', here + 'toText')
  doc.numbers().toNumber()
  t.equal(doc.text(), '-5 is cold', here + 'back toNumber')

  doc = nlp('(-5) is cold')
  doc.numbers().toText()
  t.equal(doc.text(), '(minus five) is cold', here + 'sign in pre-punctuation')

  doc = nlp('-5 is cold')
  doc.numbers().add(10)
  t.equal(doc.text(), '5 is cold', here + 'add crosses zero')

  doc = nlp('-$5 is owed')
  doc.numbers().toText()
  t.equal(doc.text(), 'minus five dollars is owed', here + 'money toText')

  doc = nlp('-1,500 is cold')
  doc.numbers().toLocaleString()
  t.equal(doc.text(), '-1,500 is cold', here + 'toLocaleString')

  t.deepEqual(nlp('-5 and -6').numbers().greaterThan(-6).out('array'), ['-5'], here + 'greaterThan')
  t.end()
})

test('slash fractions parse:', function (t) {
  const arr = [
    ['1/2', 0.5],
    ['12/40', 0.3],
    ['3/4ths', 0.75],
    ['2/3rds', 0.667],
    ['-1/2', -0.5],
    ['1/0', null],
  ]
  arr.forEach(([str, num]) => {
    t.deepEqual(nlp(str).numbers().get(), [num], here + str)
  })
  const doc = nlp('1/2 of them')
  doc.numbers().toPercentage()
  t.equal(doc.text(), '50% of them', here + 'toPercentage')
  t.end()
})
