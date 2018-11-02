var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('value-lumper-splitter:', function(t) {
  var r = nlp('202 199');
  t.equal(r.values().length, 2, 'two-numbers');

  r = nlp('two hundred and fifty times six');
  t.equal(r.values().length, 2, 'two-numbers2');

  r = nlp('one two');
  t.equal(r.values().length, 2, 'two-numbers3');

  r = nlp('fifth ninth');
  t.equal(r.values().length, 2, 'two-numbers4');
  t.end();
});

test('value-basic:', function(t) {
  var r = nlp('third month of 2019');
  r.values().toNumber();
  t.equal(r.out(), '3rd month of 2019', 'toNumber');

  r.values().toText();
  t.equal(r.out(), 'third month of two thousand and nineteen', 'toText');

  r = nlp('third month of two thousand and nineteen');
  r.values().toCardinal();
  t.equal(r.out(), 'three month of two thousand and nineteen', 'toCardinal');

  r = nlp('three month of two thousand nineteen');
  r.values().toOrdinal();
  t.equal(r.out(), 'third month of two thousand and nineteenth', 'toOrdinal');

  r.values().toNumber().all();
  t.equal(r.out(), '3rd month of 2019th', 'toNumber2');

  t.end();
});

test('value-to_ordinal:', function(t) {
  [[11, '11th'], [5, '5th'], [22, '22nd']].forEach(function(a) {
    var str = nlp(a[0]).values().toOrdinal().out('normal');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

test('value-number:', function(t) {
  [
    ['five hundred feet', 500],
    ['fifty square feet', 50],
    ['90 hertz', 90],
    // ['5 six-ounce containers', 5],
    ['twelve 2-gram containers', 12],
    ['thirty-seven forever-21 stores', 37]
  ].forEach(function(a) {
    var str = nlp(a[0]).values().toNumber().term(0).first().out('normal');
    a[1] = String(a[1]);
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

test('add/subtract:', function(t) {
  var r = nlp('beginning of 2019').values().add(2).all();
  t.equal(r.out(), 'beginning of 2021', 'add-2-cardinal');

  r = nlp('beginning of the 2019th').values().add(2).all();
  t.equal(r.out(), 'beginning of the 2021st', 'add-2-ordinal');

  r = nlp('beginning of the 2019th').values().add(-2).all();
  t.equal(r.out(), 'beginning of the 2017th', 'add-minus-2-ordinal');

  r = nlp('beginning of 2019').values().subtract(2).all();
  t.equal(r.out(), 'beginning of 2017', 'subtract-2-cardinal');

  r = nlp('beginning of the 2019th').values().subtract(2).all();
  t.equal(r.out(), 'beginning of the 2017th', 'subtract-2-ordinal');

  r = nlp('seventeen years old').values().add(2).all();
  t.equal(r.out(), 'nineteen years old', 'text-add-2-ordinal');
  r = nlp('seventeenth birthday').values().add(2).all();
  t.equal(r.out(), 'nineteenth birthday', 'text-add-2-ordinal');

  r = nlp('seventeen years old').values().subtract(2).all();
  t.equal(r.out(), 'fifteen years old', 'text-subtract-2-cardinal');
  r = nlp('seventeenth birthday').values().subtract(2).all();
  t.equal(r.out(), 'fifteenth birthday', 'text-subtract-2-cardinal');

  r = nlp('seven apples and 1,231 peaches').values().add(50).all();
  t.equal(r.out(), 'fifty seven apples and 1,281 peaches', 'two-add-50s');
  t.end();
});

test('increment:', function(t) {
  var r = nlp('seven apples and 231 peaches');
  r.values().increment();
  t.equal(r.out(), 'eight apples and 232 peaches', 'increment-cardinal');
  r.values().decrement();
  t.equal(r.out(), 'seven apples and 231 peaches', 'decrement-cardinal');

  r = nlp('seventh place and 12th place');
  r.values().increment().increment();
  t.equal(r.out(), 'ninth place and 14th place', 'increment-ordinal');
  r.values().decrement().decrement();
  t.equal(r.out(), 'seventh place and 12th place', 'decrement-ordinal');
  t.end();
});

test('nounit:', function(t) {
  var r = nlp('seven apples and 231 peaches');
  var arr = r.values().out('array');
  t.deepEqual(arr, ['seven apples', '231 peaches']);

  arr = r.values().noUnits().out('array');
  t.deepEqual(arr, ['seven', '231']);
  t.end();
});

test('value-unit:', function(t) {
  [
    ['five hundred feet', 'feet'],
    // ['fifty hertz', 'hertz'],
    ['100 dollars', 'dollars'],
    // ['$100', 'dollar'],
    // ['¥2.5', 'yen'],
    // ['€3,000,100', 'euro'],
    // ['EUR 9.99', 'eur'],
    // ['5 g', 'g'],
    // ['2 in', 'in'],
    // ['5 g sugar', 'g'],
    ['3 grams', 'grams'],
    ['2 inches', 'inches'],
    ['10 grams of sugar', 'grams'],
    ['fifty inches of snow', 'inches']
  ].forEach(function(a) {
    var r = nlp(a[0]).values().units();
    str_test(r.out('normal'), a[0], a[1], t);
  });
  t.end();
});

test('number splits', function(t) {
  var arr = [
    '12, 34, 56',
    '12 34 56',
    '12, 34, 56',
    '1 2 4'
  ];
  arr.forEach((str) => {
    var tokens = nlp(str).values().out('array');
    t.equal(tokens.length, 3, str);
  });
  t.end();
});

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
//     var str = nlp.value(a[0]).measurement;
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
//     var str = nlp.value(a[0]).of_what;
//     str_test(str, a[0], a[1], t);
//   });
//   t.end();
// });
