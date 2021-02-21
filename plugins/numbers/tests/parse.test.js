const test = require('tape')
const nlp = require('./_lib')

test('parse numbers', function (t) {
  let arr = [
    ['seven hundred', 700],
    ['a hundred and seventy', 170],
    ['9 hundred', 900],
    ['9 hundred and 2', 902],
    ['9 hundred and twenty', 920],
    ['hundred and seventy', 170],
    ['hundred and seventy two', 172],
    ['hundred and seventy two thousand', 172000],
    ['seven hundred and twenty', 720],
    //
    ['seven twenty', 720],
    ['two twenty', 220],
    ['two fifty', 250],
    ['two fifty five', 255],
    ['three twenty', 320],
    ['hundred and three', 103],

    // false-positives
    ['seven and twenty', 7],
    ['three three', 3],
    // ['three twentieth', null],
    // ['third twenty', null],
    // ['seventy hundred', null],
  ]
  arr.forEach(function (a) {
    const num = nlp(a[0]).values().get(0)
    t.equal(num, a[1], '[Parse]: ' + a[0])
  })
  t.end()
})
