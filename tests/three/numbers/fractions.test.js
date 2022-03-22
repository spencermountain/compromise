import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/fractions] '

test('numerator-denominator parsing', function (t) {
  let arr = [
    ['1/2', 1, 2],
    ['seven out of ten apples', 7, 10],
    ['i gave him one third of a slice', 1, 3],
    ['i gave him a third of a slice', 1, 3],
    ['i gave him two fourths of a slice', 2, 4],
    ['i gave him a half of a gummy', 1, 2],
    ['i gave him three halfs of a gummy', 3, 2],
    ['3/8', 3, 8],
    ['3/8th', 3, 8],
    ['3/8ths', 3, 8],
    ['3/8s', 3, 8],
  ]
  arr.forEach(a => {
    let res = nlp(a[0]).fractions().json()[0] || {}
    t.equal((res.fraction || {}).numerator, a[1], here + 'numerator - ' + a[0])
    t.equal((res.fraction || {}).denominator, a[2], here + 'denominator - ' + a[0])
  })
  t.end()
})

test('fraction-normalize:', function (t) {
  let arr = [
    ['in 3/8ths of a minute', 'in 3/8 of a minute'],
    ['apparently, 3 out of four cats do think so', 'apparently, 3/4 cats do think so'],
    ['two thirds of a cake', '2/3 of a cake'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.fractions().toFraction()
    t.equal(doc.text(), a[1], here + a[1])
  })
  t.end()
})

test('parse fractions:', function (t) {
  let arr = [
    ['1000th of a parsec', '0.001 of a parsec', 0.001],
    // complex denominators
    // ['one fifty fourths', '0.018', 0.018],
    // ['one thirty third', '0.03', 0.03],
    // ['one thirty second of an inch', '0.031 of an inch', 0.031],
    // ['six thirty seconds of an inch', '0.187 of an inch', 0.187],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    let m = doc.fractions()
    let found = m.get()[0] || {}
    t.equal(found.decimal, a[2], here + 'parse- ' + a[0])
  })
  t.end()
})

test('numbers with fractions:', function (t) {
  let arr = [
    ['one and a half', '1.5', 1.5],
    ['two halves', '1', 1],
    ['one thousandth of a parsec', '0.001 of a parsec', 0.001],
    ['five thousandths of a foot', '0.005 of a foot', 0.005],
    // ['two hundred and twelve and one twentieth', '212.05', 212.05],
    ['a millionth of a degree', '0.000001', 0.000001],
    ['a sixteenth', '0.063', 0.063],
    ['three quarters', '0.75', 0.75],
    ['1 and a half', '1.5', 1.5],
    ['five hundredths', '0.05', 0.05],
    // ['half the team', '0.5', 0.5],
    // ['two hundred and twelve and five hundred thousandths', '212.5', 212.5],
    // ['two hundred and twelve and five hundred and one thousandths', '212.501', 212.501],
  ]

  arr.forEach(a => {
    let doc = nlp(a[0])
    let m = doc.numbers()
    let found = m.get()[0] || null
    t.equal(found, a[2], here + a[0])
    // t.equal(doc.fractions().toDecimal().text(), a[1], 'toDecimal(): ' + a[1])
  })
  t.end()
})

test('fully-ambiguous fractions', function (t) {
  // shouldn't mangle the 'second'
  let arr = [
    ['three fifths of an inch', 3, 5],
    ['thirty fifths of an inch', 30, 5],
    ['thirty five fifths of an inch', 35, 5],
    ['three hundred tenths of an inch', 300, 10],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    let found = doc.fractions().get()[0] || {}
    t.equal(found.numerator, a[1], here + 'numerator: ' + a[0])
    t.equal(found.denominator, a[2], here + 'denominator: ' + a[0])
  })
  t.end()
})

test('seconds-edge-case', function (t) {
  // shouldn't mangle the 'second'
  let arr = [
    ['one fifth of a book', '1/5 of a book'],
    ['thirty seconds', 'thirty seconds'],
    // ['one thirty second of an inch', '1/32 of an inch'],
    // ['three thirty secondths of an inch', '3/32 of an inch'],
  ]

  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.fractions().toFraction()
    t.equal(doc.text(), a[1], here + a[1])
  })
  t.end()
})

test('do-math:', function (t) {
  let arr = nlp('1/2').fractions().get()
  t.equal((arr[0] || {}).decimal, 0.5, here + 'do-math')

  // arr = nlp('1 1/2').fractions().json()
  // t.equal(arr[0].decimal, 1.5)
  // t.equal(arr.length, 1)

  // arr = nlp('1/2 1').fractions().json()
  // t.equal(arr[0].decimal, 0.5)
  // t.equal(arr.length, 2)

  t.end()
})

test('fraction ordinal/cardinal:', function (t) {
  let doc = nlp('three fifths of an inch')
  doc.fractions().toCardinal()
  t.equal(doc.text(), 'three out of five of an inch', here + 'toCardinal')

  doc = nlp('three out of five senators')
  doc.fractions().toOrdinal()
  t.equal(doc.text(), 'three fifths of senators', here + 'toOrdinal')

  doc = nlp('three fifths of an inch')
  doc.fractions().toOrdinal()
  t.equal(doc.text(), 'three fifths of an inch', here + 'unchanged toOrdinal')

  doc = nlp('three out of five senators')
  doc.fractions().toCardinal()
  t.equal(doc.text(), 'three out of five senators', here + 'unchanged toCardinal')
  t.end()
})
