import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/number-value] '

test('value-lumper-splitter:', function (t) {
  let r = nlp('202 199')
  t.equal(r.values().length, 2, here + 'two-numbers')

  r = nlp('two hundred and fifty times six')
  t.equal(r.values().length, 2, here + 'two-numbers2')

  r = nlp('one two')
  t.equal(r.values().length, 2, here + 'two-numbers3')

  r = nlp('fifth ninth')
  t.equal(r.values().length, 2, here + 'two-numbers4')
  t.end()
})

test('value-basic:', function (t) {
  const r = nlp('third month of 2019')
  r.values().toNumber()
  t.equal(r.out(), '3rd month of 2019', here + 'toNumber')

  r.values().toText()
  t.equal(r.out(), 'third month of two thousand and nineteen', here + 'toText')

  // r = nlp('third month of two thousand and nineteen')
  // r.values().toCardinal()
  // t.equal(r.out(), 'three months of two thousand and nineteen', here + 'toCardinal')

  // r = nlp('three months of two thousand nineteen')
  // r.values().toOrdinal()
  // t.equal(r.out(), 'third month of two thousand and nineteenth', here + 'toOrdinal')

  // r.values()
  //   .toNumber()
  //   .all()
  // t.equal(r.out(), '3rd month of 2019th', here + 'toNumber2')

  t.end()
})

test('value-to_ordinal:', function (t) {
  const arr = [
    [11, '11th'],
    [5, '5th'],
    [22, '22nd'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0])
      .values()
      .toOrdinal()
      .out('normal')
    t.equal(str, a[1], here + a[0])
  })
  t.end()
})

test('value-number:', function (t) {
  const arr = [
    ['five hundred feet', 500],
    ['fifty square feet', 50],
    ['90 hertz', 90],
    // ['5 six-ounce containers', 5],
    ['twelve 2-gram containers', 12],
    ['thirty-seven forever-21 stores', 37],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0])
      .values()
      .toNumber()
      .terms(0)
      .first()
      .out('normal')
    a[1] = String(a[1])
    t.equal(str, a[1], here + a[0])
  })
  t.end()
})

test('add/subtract:', function (t) {
  let r = nlp('beginning of 2019')
    .values()
    .add(2)
    .all()
  t.equal(r.out(), 'beginning of 2021', here + 'add-2-cardinal')

  r = nlp('beginning of the 2019th')
    .values()
    .add(2)
    .all()
  t.equal(r.out(), 'beginning of the 2021st', here + 'add-2-ordinal')

  r = nlp('beginning of the 2019th')
    .values()
    .add(-2)
    .all()
  t.equal(r.out(), 'beginning of the 2017th', here + 'add-minus-2-ordinal')

  r = nlp('beginning of 2019')
    .values()
    .subtract(2)
    .all()
  t.equal(r.out(), 'beginning of 2017', here + 'subtract-2-cardinal')

  r = nlp('beginning of the 2019th')
    .values()
    .subtract(2)
    .all()
  t.equal(r.out(), 'beginning of the 2017th', here + 'subtract-2-ordinal')

  r = nlp('seventeen years old')
    .values()
    .add(2)
    .all()
  t.equal(r.out(), 'nineteen years old', here + 'text-add-2-ordinal')
  r = nlp('seventeenth birthday')
    .values()
    .add(2)
    .all()
  t.equal(r.out(), 'nineteenth birthday', here + 'text-add-2-ordinal')

  r = nlp('seventeen years old')
    .values()
    .subtract(2)
    .all()
  t.equal(r.out(), 'fifteen years old', here + 'text-subtract-2-cardinal')

  r = nlp('seventeenth birthday')
    .values()
    .subtract(2)
    .all()
  t.equal(r.out(), 'fifteenth birthday', here + 'text-subtract-2-cardinal')

  r = nlp('seven apples and 1,231 peaches')
    .values()
    .add(50)
    .all()
  t.equal(r.out(), 'fifty seven apples and 1,281 peaches', here + 'two-add-50s')
  t.end()
})

test('increment:', function (t) {
  let r = nlp('seven apples and 231 peaches')
  r.values().increment()
  t.equal(r.out(), 'eight apples and 232 peaches', here + 'increment-cardinal')
  r.values().decrement()
  t.equal(r.out(), 'seven apples and 231 peaches', here + 'decrement-cardinal')

  r = nlp('seventh place and 12th place')
  r.values()
    .increment()
    .increment()
  t.equal(r.out(), 'ninth place and 14th place', here + 'increment-ordinal')
  r.values()
    .decrement()
    .decrement()
  t.equal(r.out(), 'seventh place and 12th place', here + 'decrement-ordinal')
  t.end()
})

test('number splits', function (t) {
  const arr = ['12, 34, 56', '12 34 56', '12, 34, 56', '1 2 4']
  arr.forEach(str => {
    const tokens = nlp(str)
      .values()
      .out('array')
    t.equal(tokens.length, 3, here + str)
  })
  t.end()
})

// test('nounit:', function(t) {
//   let r = nlp('seven apples and 231 peaches')
//   let arr = r.values().out('array')
//   t.deepEqual(arr, ['seven apples', '231 peaches'])

//   arr = r
//     .values()
//     .noUnits()
//     .out('array')
//   t.deepEqual(arr, ['seven', '231'])
//   t.end()
// })

// test('value-unit:', function(t) {
//   let arr = [
//     ['five hundred feet', 'feet'],
//     ['fifty hertz', 'hertz'],
//     ['100 dollars', 'dollars'],
//     // ['$100', 'dollar'],
//     // ['¥2.5', 'yen'],
//     // ['€3,000,100', 'euro'],
//     // ['EUR 9.99', 'eur'],
//     // ['5 g', 'g'],
//     // ['2 in', 'in'],
//     // ['5 g sugar', 'g'],
//     ['3 grams', 'grams'],
//     ['2 inches', 'inches'],
//     ['10 grams of sugar', 'grams'],
//     ['fifty inches of snow', 'inches'],
//     ['7 years', 'years'],
//     ['7.5 days', 'days'],

//     ['7th year', 'year'],
//     ['7th years', ''],
//     ['1 day', 'day'],
//     ['one book', 'book'],
//     ['first book', 'book'],
//     ['7 day', ''],
//   ]
//   arr.forEach(function(a) {
//     const r = nlp(a[0])
//       .values()
//       .units()
//     t.equal(r.out('normal'), a[1], a[0])
//   })
//   t.end()
// })
// test('value-measurement:', function(t) {
//   [
//     ['five hundred feet', 'Distance'],
//     ['100 kilometers', 'Distance'],
//     ['fifty hertz', 'Frequency'],
//     ['59 thousand $', 'Money'],
//     ['100 mb', 'Data'],
//     ['50 руб', 'Money'],
//     ['EUR 9.99', 'Money'],
//     ['100 dollars', 'Money'],
//     ['256 bitcoins', 'Money'],
//   ].forEach(function (a) {
//     const str = nlp.value(a[0]).measurement;
//     str_test(str, a[0], a[1], t);
//   });
//   t.end();
// });
//
// test('value-of_what:', function(t) {
//   [
//     ['nine kg', 'kg'],
//     ['5 kg of copper', 'copper'],
//     ['many of these stories', 'many of these stories'],
//     ['room full of beautiful creatures', 'full of beautiful creatures'],
//     ['boxes of bags of food', 'boxes of bags of food'],
//     ['5 boxes of water', 'boxes of water'],
//     ['6 of kids', 'kids'],
//     ['10 kids', 'kids'],
//     ['just nothing', 'just nothing'],
//     ['EUR 77', 'eur'],
//     ['kg', 'kg']
//   ].forEach(function (a) {
//     const str = nlp.value(a[0]).of_what;
//     str_test(str, a[0], a[1], t);
//   });
//   t.end();
// });
