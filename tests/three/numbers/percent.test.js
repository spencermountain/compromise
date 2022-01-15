import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/number-percent] '

test('percent-basic:', function (t) {
  let m = nlp('it is 33%').percentages()
  t.equal(m.out('normal'), '33%', 'match-33%')

  //parse number
  let arr = nlp('it is 50% of our budget').percentages().json()
  t.equal(arr[0].number.num, 50, here + 'match-50')

  arr = nlp('it is 9,000% of our budget').percentages().json()
  t.equal(arr[0].number.num, 9000, here + 'match-9000')

  //percent-decimal
  arr = nlp('it is 0.5% of our budget').percentages().json()
  t.equal(arr[0].number.num, 0.5, here + 'match-0.5')

  t.end()
})

test('percent-conversion:', function (t) {
  let str = '3% of the budget'
  let r = nlp(str).values().toNumber().all()
  t.equal(r.out(), str, here + '3% to number')

  str = "it's 39% of the budget"
  r = nlp(str).values().toNumber().all()
  t.equal(r.out(), str, here + '39% to number')

  str = '39% of the budget'
  r = nlp(str).values().toText().all()
  t.equal(r.out(), 'thirty nine percent of the budget', here + 'to text')

  str = 'around 100% of the budget'
  r = nlp(str).values().toText().all()
  t.equal(r.out(), 'around one hundred percent of the budget', here + 'to text')

  str = 'around 100 percent of the budget'
  r = nlp(str).values().toText().all()
  t.equal(r.out(), 'around one hundred percent of the budget', here + 'to text')

  t.end()
})

test('percent-tag:', function (t) {
  let tests = [
    ['7%', true],
    ['7.0%', true],
    ['2.22%', true],
    ['.2%', true],
    ['0.2%', true],
    ['fifteen percent', true],
    ['one hundred and ten percent', true],
    ['2,999%', true],
    ['2asdf99%', false],
    ['99%3', false],
  ]
  tests.forEach(function (a) {
    let r = nlp(a[0])
    t.equal(r.percentages().found, a[1], here + "Percent-has: '" + a[0] + "'")
  })
  t.end()
})
