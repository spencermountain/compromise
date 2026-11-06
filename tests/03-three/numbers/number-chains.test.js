import test from 'tape'
import nlp from '../lib.js'
const here = '[three/numbers/number-chains] '

// a tens-word can't be followed by another - these are separate numbers
test('neighbouring numbers are split', function (t) {
  const arr = [
    ['twenty fifty', [20, 50]],
    ['twenty sixty', [20, 60]],
    ['twenty ninety', [20, 90]],
    ['twenty eighty two', [20, 82]],
    ['twenty fifty five', [20, 55]],
    ['forty eighty two', [40, 82]],
    ['fourty eighty two', [40, 82]],
    ['thirty twenty', [30, 20]],
    ['thirty twenty six', [30, 26]],
    ['twenty forty one', [20, 41]],
    ['twenty forty nine', [20, 49]],
    ['twenty thirty forty', [20, 30, 40]],
    ['twenty twenty twenty', [20, 20, 20]],
    ['ten twenty thirty', [10, 20, 30]],
    ['sixty fifteen', [60, 15]],
    ['sixty ten', [60, 10]],
    ['sixty fifteen and thirty five', [60, 15, 35]],
    ['five twenty twenty', [520, 20]],
    ['one hundred twenty twenty', [120, 20]],
    ['twenty-five twenty ten', [25, 20, 10]],
    ['twenty, thirty', [20, 30]],
    ['twenty, twenty one, twenty two', [20, 21, 22]],
  ]
  arr.forEach(a => {
    t.deepEqual(nlp(a[0]).numbers().get(), a[1], here + a[0])
  })
  t.end()
})

test('single numbers stay whole', function (t) {
  const arr = [
    ['twenty nine', [29]],
    ['twenty-nine', [29]],
    ['two fifty', [250]],
    ['two fifty five', [255]],
    ['three twenty', [320]],
    ['two hundred fifty', [250]],
    ['two hundred and fifty five', [255]],
    ['one hundred twenty', [120]],
    ['two thousand and twenty', [2020]],
    ['ninety nine', [99]],
  ]
  arr.forEach(a => {
    t.deepEqual(nlp(a[0]).numbers().get(), a[1], here + a[0])
  })
  t.end()
})

test('a dash separates numbers', function (t) {
  const arr = [
    ['two hundred - three hundred', [200, 300]],
    ['twenty five - thirty', [25, 30]],
    ['one thousand - two thousand', [1000, 2000]],
  ]
  arr.forEach(a => {
    t.deepEqual(nlp(a[0]).numbers().get(), a[1], here + a[0])
  })
  t.end()
})

test('conversion keeps every number, and its spacing', function (t) {
  const arr = [
    ['twenty fifty', '20 50'],
    ['twenty eighty two', '20 82'],
    ['two hundred - three hundred', '200 - 300'],
    ['twenty five - thirty', '25 - 30'],
    ['twenty ten dollar bills', '20 10 dollar bills'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.numbers().toNumber()
    t.equal(doc.text(), a[1], here + a[0])
  })
  t.end()
})
