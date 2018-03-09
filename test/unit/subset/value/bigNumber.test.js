var test = require('tape');
var nlp = require('../../lib/nlp');

var cardinal = function(str) {
  return nlp(str).values().numbers()[0];
};

test('a very large cardinal', function(t) {
  t.equal(cardinal('nine trillion two hundred'), 9000000000200);
  t.equal(cardinal('nine quadrillion two thousand and six'), 9000000000002006);
  t.equal(cardinal('ninety quintillion two thousand and six'), 90000000000000002006);
  t.equal(cardinal('ninety nine quintillion two thousand and six'), 99000000000000002006);
  t.equal(cardinal('nine sextillion'), 9000000000000000000000);
  // t.equal(cardinal('nine septillion'), 9000000000000000000000000);
  // t.equal(cardinal('ninety nine septillion two thousand and six'), 99000000000000000002006);
  // t.equal(cardinal('one hundred and twenty-three septillion, four hundred and fifty-six sextillion, seven hundred and eighty-nine quintillion, one hundred and twenty-three quadrillion, four hundred and fifty-six trillion, seven hundred and eighty-nine billion, one hundred and twenty-three million, four hundred and fifty-six thousand and seven hundred and eighty-nine'), 123456789123456789123456789);
  // t.equal(cardinal('seven hundred and eighty-nine quintillion, one hundred and twenty-three quadrillion, four hundred and fifty-six trillion, seven hundred and eighty-nine billion, one hundred and twenty-three million, four hundred and fifty-six thousand and seven hundred and eighty-nine'), 789123456789123456789);
  t.end();
});

test('number ordinal', function(t) {
  t.equal(nlp('two hundred sextillion').values().data()[0].niceOrdinal, '200,000,000,000,000,000,000,000th');
  t.equal(nlp('thirty seven quadrillion and two hundred').values().data()[0].niceOrdinal, '37,000,000,000,000,200th');
  t.equal(nlp('thirty seven quadrillion, two thousand').values().data()[0].niceOrdinal, '37,000,000,000,002,000th');
  t.equal(nlp('ninety nine quadrillion, two hundred thousand').values().data()[0].niceOrdinal, '99,000,000,000,200,000th');
  //javascript math can't do this.
  // t.equal(nlp('thirty sextillion and two').values().data()[0].niceOrdinal, '30,000,000,000,000,000,000,002nd');
  // t.equal(nlp('ninety nine quadrillion, two hundred and fifty thousand').values().data()[0].niceOrdinal, '99,000,000,000,250,000th');
  t.end();
});

test('text ordinal', function(t) {
  t.equal(nlp('thirty quadrillion and two hundred').values().data()[0].textOrdinal, 'thirty quadrillion two hundredth');
  t.equal(nlp('nine trillion seven hundred fifty').values().data()[0].textOrdinal, 'nine trillion seven hundred and fiftieth');
  t.equal(nlp('a quintillion').values().data()[0].textOrdinal, 'one quintillionth');
  t.equal(nlp('seventy-two quintillion').values().data()[0].textOrdinal, 'seventy two quintillionth');
  t.end();
});

test('from number', function(t) {
  t.equal(nlp('9000000000200').values().toText().out(), 'nine trillion two hundred');
  t.equal(nlp('70000000000200').values().toText().out(), 'seventy trillion two hundred');
  t.equal(nlp('9000000000002006').values().toText().out(), 'nine quadrillion two thousand and six');
  t.equal(nlp('900,000,000').values().toText().out(), 'nine hundred million');
  t.equal(nlp('9,000,000,030').values().toText().out(), 'nine billion and thirty');
  t.equal(nlp('10,000,000,000').values().toText().out(), 'ten billion');
  // t.equal(nlp('900,000,000,037').values().toText().out(), 'nine hundred billion and thirty seven');
  //javascript can't do this
  // t.equal(nlp('90000000000000002006').values().toText().out(), 'ninety quintillion two thousand and six');
  // t.equal(nlp('99000000000000002006').values().toText().out(), 'ninety nine quintillion two thousand and six');
  // t.equal(nlp('9000000000000000000000').values().toText().out(), 'nine sextillion');
  t.end();
});

// test('cardinal numbers', function(t) {
//   t.equal(cardinal('sixty-one trillion, six hundred and eighty-nine billion, four hundred and seventy-three million, four hundred and fifty-three thousand and five hundred and ninety'), 61689473453590);
//   t.end();
// });

// test('cardinal numbers in american form (with ands)', function(t) {
//   t.equal(cardinal('six hundred eighty-nine billion, four hundred seventy-three million, four hundred fifty-three thousand, five hundred ninety'), 689473453590);
//   t.end();
// });

// test('ordinal numbers', function(t) {
//   t.equal(cardinal('six hundred and eighty-nine billion, four hundred and seventy-three million, four hundred and fifty-three thousand and five hundred and ninetieth'), 689473453590);
//   t.end();
// });

// test('cardinal numbers in american form (with ands)', function(t) {
//   t.equal(cardinal('six hundred eighty-nine billion, four hundred seventy-three million, four hundred fifty-three thousand, five hundred ninetieth'), 689473453590);
//   t.end();
// });
