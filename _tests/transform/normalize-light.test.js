const test = require('tape')
const nlp = require('../_lib')

test('normalize - light', function (t) {
  let arr = [
    [
      ' so... you like donuts? have all the donuts in the world!!!',
      'so you like donuts? have all the donuts in the world!',
    ],
    // ['This is a test. .', 'this is a test.'],
    ['This is a test?!', 'This is a test?'],
    ['Björk, the singer-songwriter...', 'Bjork the singer songwriter'],
    // ['the so-called “fascist  dictator”', 'the so called "fascist dictator"'],
    // ['the so-called ❛singer-songwriter❜', 'the so called \'singer songwriter\''],
    // ['the so-called ❛group of seven❜', 'the so called \'group of 7\''],
    ['Director of the F.B.I.', 'Director of the FBI'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).normalize().out('text')
    t.equal(str, a[1], a[0])
  })
  t.end()
})

test('normalize - medium', function (t) {
  let arr = [
    [
      ' so... you like DONUTS? have all the donuts in the WORLD!!!',
      'so you like donuts? have all the donuts in the world!',
    ],
    ['This is a test?!', 'this is a test?'],
    ['Björk, the singer-songwriter...', 'bjork the singer songwriter'],
    ['Director of the F.B.I.', 'director of the fbi'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).normalize('medium').out('text')
    t.equal(str, a[1], a[0])
  })
  t.end()
})

test('normalize - heavy', function (t) {
  let arr = [
    [
      ' so... you like DONUTS? have all the donuts in the WORLD!!!',
      'so you like donut? have all the donut in the world!',
    ],
    // ['This is a test?!', 'this be a test?'],
    ['Björk, the singer-songwriter...', 'bjork the singer songwriter'],
    ['Director of the F.B.I.', 'director of the fbi'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).normalize('heavy').out('text')
    t.equal(str, a[1], a[0])
  })
  t.end()
})
