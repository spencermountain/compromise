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
  t.end();
});
