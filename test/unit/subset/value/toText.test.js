var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('to_text:', function(t) {
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
    [900000080, 'nine hundred million and eighty']
  ].forEach(function(a) {
    var str = nlp(a[0]).values().toText().out('text');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

test('all-to-text:', function(t) {
  var arr = [
    'one',
    '1',
    '1.0', //not sure..
    '1st',
    'first'
  ];
  arr.forEach(txt => {
    var str = nlp(txt).values().data()[0].text;
    t.equal(str, 'one', txt + ' -> one');
  });
  arr = ['500', '500.0', '500th', 'five hundred', 'five hundredth'];
  arr.forEach(txt => {
    var str = nlp(txt).values().data()[0].text;
    t.equal(str, 'five hundred', txt + ' -> five hundred');
  });
  arr = ['2012', '2012.0', '2,012', '2012th', 'two thousand and twelve', 'two thousand and twelfth'];
  arr.forEach(txt => {
    var str = nlp(txt).values().data()[0].text;
    t.equal(str, 'two thousand and twelve', txt + ' -> two thousand and twelve');
  });
  t.end();
});

test('big number:', function(t) {
  var str = nlp('twenty-three quadrillion').values().toText().out();
  t.equal(str, 'twenty three quadrillion', 'quadrillion');

  // str = nlp('nine quintillion two hundred').values().toText().out();
  // t.equal(str, 'nine quintillion two hundred', 'quantillion');
  t.end();
});
