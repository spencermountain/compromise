const test = require('tape')
const nlp = require('./_lib')

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
  arr.forEach((a) => {
    let res = nlp(a[0]).fractions().json()[0] || {}
    t.equal(res.numerator, a[1], 'numerator - ' + a[0])
    t.equal(res.denominator, a[2], 'denominator - ' + a[0])
  })
  t.end()
})

test('fraction-normalize:', function (t) {
  let arr = [
    ['in 3/8ths of a second', 'in 3/8 of a second'],
    ['apparently, 3 out of four cats do think so', 'apparently, 3/4 cats do think so'],
    ['two thirds of a cake', '2/3 of a cake'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    doc.fractions().normalize()
    t.equal(doc.text(), a[1], a[1])
  })
  t.end()
})

// test('do-math:', function (t) {
//   let arr = nlp('1/2').fractions().json()
//   t.equal(arr[0].number, 0.5)

//   arr = nlp('1 1/2').fractions().json()
//   t.equal(arr[0].number, 1.5)
//   t.equal(arr.length, 1)

//   arr = nlp('1/2 1').fractions().json()
//   t.equal(arr[0].number, 0.5)
//   t.equal(arr.length, 2)

//   t.end()
// })
