import test from 'tape'
import nlp from '../lib.js'
const here = '[three/numbers/number-parse] '

test('parse numbers', function (t) {
  const arr = [
    ['seven hundred', 700],
    ['a hundred and seventy', 170],
    ['9 hundred', 900],
    ['9 hundred and 2', 902],
    ['9 hundred and twenty', 920],
    ['hundred and seventy', 170],
    ['hundred and seventy two', 172],
    ['hundred and seventy two thousand', 172000],
    ['seven hundred and twenty', 720],
    ['three twenty', 320],
    ['hundred and three', 103],

    //dropped-hundred
    ['seven twenty', 720],
    ['two twenty', 220],
    ['eight fifty', 850],
    ['two fifty', 250],
    ['two fifty five', 255],

    ['two and a half', 2.5],
    ['fifty and a half', 50.5],
    // ['two fifty and three quarters', 250.75],
    ['twenty two percent', 22],
    ['two hundred and twenty percent', 220],
    ['220 percent', 220],
    ['$220', 220],

    // false-positives
    ['seven and twenty', 7],
    ['three three', 3],
    ['four two zero', 4],
    // ['three twentieth', null],
    // ['third twenty', null],
    // ['seventy hundred', null],
  ]
  arr.forEach(function (a) {
    const num = nlp(a[0]).values().get()[0]
    t.equal(num, a[1], here + a[0])
  })
  t.end()
})

test('parse dozen', function (t) {
  const arr = [
    ['a dozen', 12],
    ['two dozen eggs', 24],
    ['three dozen', 36],
    ['i bought a dozen eggs', 12],
    ['half a dozen eggs', 6],
  ]
  arr.forEach(function (a) {
    const num = nlp(a[0]).numbers().get()[0]
    t.equal(num, a[1], here + a[0])
  })
  t.end()
})

test('parse hundreds after a bigger multiple', function (t) {
  const arr = [
    ['one million nine hundred ninety-four thousand', 1994000],
    ['two million three hundred forty five thousand six hundred and seven', 2345607],
    ['five million two hundred five thousand', 5205000],
    ['one billion two hundred thirty million', 1230000000],
    ['nine billion one hundred twelve million two hundred five thousand and six', 9112205006],
    // unchanged
    ['two hundred fifty thousand', 250000],
    ['one million two hundred thousand', 1200000],
    ['seven million nine hundred thousand two hundred and five', 7900205],
  ]
  arr.forEach(function (a) {
    const num = nlp(a[0]).numbers().get()[0]
    t.equal(num, a[1], here + a[0])
  })
  t.end()
})
