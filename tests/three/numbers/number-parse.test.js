import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/number-parse] '

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
