var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==Value==', function(T) {

  T.test('to_ordinal:', function(t) {
    [
      [11, '11th'],
      [5, '5th'],
      [22, '22nd'],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).to_ordinal();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('number:', function(t) {
    [
      ['five hundred feet', 500],
      ['fifty square feet', 50],
      ['90 hertz', 90],
      ['5 six-ounce containers', 5],
      ['twelve 2-gram containers', 12],
      ['thirty-seven forever-21 stores', 37],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).number;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('unit:', function(t) {
    [
      ['five hundred feet', 'feet'],
      ['fifty hertz', 'hertz'],
      ['100 dollars', 'dollars'],
      ['$100', 'dollar'],
      ['¥2.5', 'yen'],
      ['€3,000,100', 'euro'],
      ['EUR 9.99', 'eur'],
      ['5 g', 'g'],
      ['3 grams', 'gram'],
      ['2 inches', 'inch'],
      ['2 in', 'in'],
      ['5 g sugar', 'g'],
      ['10 grams of sugar', 'gram'],
      ['fifty inches of snow', 'inch'],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).unit;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('measurement:', function(t) {
    [
      ['five hundred feet', 'Distance'],
      ['100 kilometers', 'Distance'],
      ['fifty hertz', 'Frequency'],
      ['59 thousand $', 'Money'],
      ['100 mb', 'Data'],
      ['50 руб', 'Money'],
      ['EUR 9.99', 'Money'],
      ['100 dollars', 'Money'],
      ['256 bitcoins', 'Money'],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).measurement;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('of_what:', function(t) {
    [
      ['nine kg', 'kg'],
      ['5 kg of copper', 'copper'],
      ['many of these stories', 'many of these stories'],
      ['room full of beautiful creatures', 'full of beautiful creatures'],
      ['boxes of bags of food', 'boxes of bags of food'],
      ['5 boxes of water', 'boxes of water'],
      ['6 of kids', 'kids'],
      ['10 kids', 'kids'],
      ['just nothing', 'just nothing'],
      ['EUR 77', 'eur'],
      ['kg', 'kg']
    ].forEach(function (a) {
      var str = nlp.value(a[0]).of_what;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('to_text:', function(t) {
    [
      // [-5, 'negative five'],
      [5, 'five'],
      [15, 'fifteen'],
      [10, 'ten'],
      [20, 'twenty'],
      [75, 'seventy five'],
      [97, 'ninety seven'],
      [111, 'one hundred and eleven'],
      [175, 'one hundred and seventy five'],
      [900, 'nine hundred'],
      [1175, 'one thousand one hundred and seventy five'],
      [2000, 'two thousand'],
      [2100, 'two thousand one hundred'],
      [2102, 'two thousand one hundred and two'],
      [70000, 'seventy thousand'],
      [72000, 'seventy two thousand'],
      [900000, 'nine hundred thousand'],
      [900001, 'nine hundred thousand and one'],
      [900200, 'nine hundred thousand two hundred'],
      [900205, 'nine hundred thousand two hundred and five'],
      [7900205, 'seven million nine hundred thousand two hundred and five'],
      [90000000, 'ninety million'],
      [900000000, 'nine hundred million'],
      [900000080, 'nine hundred million and eighty'],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).textual();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });


  T.test('to_number:', function(t) {
    [
      ['twenty two thousand five hundred', 22500],
      ['two thousand five hundred and sixty', 2560],
      ['a hundred and two', 102],
      ['a hundred', 100],
      ['seven', 7],
      ['seven grand', 7000],
      ['104', 104],
      ['13 thousand', 13000],
      ['17,983', 17983],
      ['nine hundred', 900],
      ['twenty one hundred', 2100],
      ['twenty one', 21],
      ['seventy two', 72],
      ['two hundred two', 202],
      ['one thousand one', 1001],
      ['minus five hundred', -500],
      ['minus fifteen', -15],
      ['five hundred million', 500000000],
      ['$12.03', 12.03],
      ['$12', 12],
      ['5 hundred', 500],
      ['5.2 thousand', 5200],
      ['million', 1000000],
      ['hundred one', 101],
      ['minus fifty', -50],
      ['twenty thousand', 20000],
      ['four point six', 4.6],
      ['nine hundred point five', 900.5],
      ['sixteen hundred sixteen point eight', 1616.8],
      ['four point seven nine', 4.79],
      ['four point sixteen', 4.16],
      ['twenty first', 21],
      ['fifty ninth', 59],
      ['nine hundred fiftieth', 950],
      ['five thousand nine hundred fiftieth', 5950],
      ['six hundred and fifty nine', 659],
      ['six hundred and fifty nine thousand', 659000],
      [950, 950],
      [999999950, 999999950],
      [8080999999950, 8080999999950],
      ['fifteen million and two', 15000002],
      ['six hundred and eighteen', 618],
      ['two hundred thousand', 200000],
      ['six million ninety', 6000090],
      ['twenty-two hundred', 2200],
      ['minus 70', -70],
      ['minus eight', -8],
      ['minus 8 hundred', -800],
      ['twenty-seven hundred', 2700],
      ['minus eight thousand two hundred', -8200],
      ['twenty-five', 25],
      ['half a million', 500000],
      ['five hundred eighteen', 518],
      ['eighty eight point nine nine', 88.99],
      ['minus eighty eight point nine nine', -88.99],
      ['1/2', 1 / 2],
      ['-1/5', -1 / 5],
      ['-1 1/10', -1 - 1 / 10],
      ['1 1/20', 1 + 1 / 20],
      ['1/2 million', 500000],
      ['1 1/2 million', 1500000],
      ['negative five', -5],
      ['negative hundred', -100],
      ['12:32', null],
      ['123-1231', null],
      ['seven eleven', null],
      ['ten-four', null],
      ['one seven', null],
      ['one ten', null],
      ['one twelve', null],
      ['one thirty', null],
      ['nine fifty', null],
      ['five six', null],
      ['nine seventy', null],
      ['nine two hundred', null],
      ['ten one', null],
      ['twelve one', null],
      ['seventy five two', null],
      ['two hundred three hundred', null],
      ['sixty fifteen hundred', null],
      ['one twenty', null],
      ['twenty five twenty', null],
    // ['', null],
    // [null, null],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).number;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

});
