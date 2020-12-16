const test = require('tape')
const nlp = require('./_lib')

test('numerator-denominator parsing', function (t) {
  let arr = [
    ['1/2', 1, 2],
    ['seven out of ten', 7, 10],
    ['i gave him one third of a slice', 1, 3],
    ['i gave him a third of a slice', 1, 3],
    ['i gave him two fourths of a slice', 2, 4],
    ['i gave him a half of a gummy', 1, 2],
    ['i gave him three halfs of a gummy', 3, 2],
  ]
  arr.forEach((a) => {
    let res = nlp(a[0]).fractions().json()[0] || {}
    t.equal(res.numerator, a[1], 'numerator - ' + a[0])
    t.equal(res.denominator, a[2], 'denominator - ' + a[0])
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
