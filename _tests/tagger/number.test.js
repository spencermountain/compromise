const test = require('tape')
const nlp = require('../_lib')

test('number-tag:', function (t) {
  let arr = [
    ['16.125', 'Cardinal'],
    ['+160.125', 'Cardinal'],
    ['-0.1', 'Cardinal'],
    ['.13', 'Cardinal'],
    ['(127.54)', 'Cardinal'],

    ['16.125th', 'Ordinal'],
    ['161,253th', 'Ordinal'],
    ['+160.125th', 'Ordinal'],
    ['-0.2nd', 'Ordinal'],
    ['(127.54th)', 'Ordinal'],
    // ['(127.54)', 'Money'],

    ['-0.1%', 'Percent'],
    ['.1%', 'Percent'],
    ['+2,340.91%', 'Percent'],
    ['-2340%', 'Percent'],

    ['$-2340.01', 'Money'],
    ['-$2340', 'Money'],
    ['+$2340.01', 'Money'],
    ['$2340.01', 'Money'],
    ['£1,000,000', 'Money'],
    ['$19', 'Money'],
    ['($127.54)', 'Money'],
    ['2,000₽', 'Money'],
    ['2000₱', 'Money'],
    ['2000௹', 'Money'],
    ['₼2000', 'Money'],
    ['2.23₽', 'Money'],
    ['₺50', 'Money'],

    ['$47.5m', 'Money'],
    ['$47.5bn', 'Money'],
    // ['1,000,000p', 'Cardinal'],
  ]
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    t.equal(doc.has('#' + a[1]), true, a[0] + ' is #' + a[1])
  })
  t.end()
})
