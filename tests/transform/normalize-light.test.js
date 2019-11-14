const test = require('tape')
const nlp = require('../_lib')

test('normalize():', function(t) {
  let arr = [
    [
      ' so... you like DONUTS? have all the donuts in the WORLD!!!',
      'so you like donuts? have all the donuts in the world!',
    ],
    // ['This is a test. .', 'this is a test.'],
    ['This is a test?!', 'this is a test?'],
    ['Björk, the singer-songwriter...', 'bjork the singer songwriter'],
    ['the so-called “fascist  dictator”', 'the so called "fascist dictator"'],
    // ['the so-called ❛singer-songwriter❜', 'the so called \'singer songwriter\''],
    // ['the so-called ❛group of seven❜', 'the so called \'group of 7\''],
    ['Director of the F.B.I.', 'director of the fbi'],
  ]
  arr.forEach(function(a) {
    const str = nlp(a[0])
      .normalize()
      .out('text')
    t.equal(str, a[1], a[0])
  })
  t.end()
})
