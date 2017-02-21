var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('==Value==', function (T) {

  T.test('to_ordinal:', function (t) {
    [
      [11, '11th'],
      [5, '5th'],
      [22, '22nd'],
    ].forEach(function (a) {
      var str = nlp(a[0]).values().toOrdinal().out('normal');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('number:', function (t) {
    [
      ['five hundred feet', 500],
      ['fifty square feet', 50],
      ['90 hertz', 90],
      // ['5 six-ounce containers', 5],
      ['twelve 2-gram containers', 12],
      ['thirty-seven forever-21 stores', 37],
    ].forEach(function (a) {
      var str = nlp(a[0]).values().toNumber().term(0).first().out('normal');
      a[1] = '' + a[1];
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  // T.test('unit:', function(t) {
  //   [
  //     ['five hundred feet', 'feet'],
  //     ['fifty hertz', 'hertz'],
  //     ['100 dollars', 'dollars'],
  //     ['$100', 'dollar'],
  //     ['¥2.5', 'yen'],
  //     ['€3,000,100', 'euro'],
  //     ['EUR 9.99', 'eur'],
  //     ['5 g', 'g'],
  //     ['3 grams', 'gram'],
  //     ['2 inches', 'inch'],
  //     ['2 in', 'in'],
  //     ['5 g sugar', 'g'],
  //     ['10 grams of sugar', 'gram'],
  //     ['fifty inches of snow', 'inch'],
  //   ].forEach(function (a) {
  //     var str = nlp.value(a[0]).unit;
  //     str_test(str, a[0], a[1], t);
  //   });
  //   t.end();
  // });
  //
  // T.test('measurement:', function(t) {
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
  // T.test('of_what:', function(t) {
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




});
