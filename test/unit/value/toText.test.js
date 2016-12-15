var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('to_text:', function (t) {
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
    var str = nlp(a[0]).values().toTextValue().plaintext();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});
