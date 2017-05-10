var test = require('tape');
var nlp = require('../../lib/nlp');

test('percent-basic:', function (t) {
  var m = nlp('it is 33%').match('#Percent');
  t.equal(m.out('normal'), '33%', 'match-33%');

  //parse number
  var arr = nlp('it is 50% of our budget').values().data();
  t.equal(arr[0].number, 50, 'match-50');

  arr = nlp('it is 9,000% of our budget').values().data();
  t.equal(arr[0].number, 9000, 'match-9000');

  //percent-decimal
  arr = nlp('it is 0.5% of our budget').values().data();
  t.equal(arr[0].number, 0.5, 'match-0.5');

  t.end();
});

test('percent-conversion:', function (t) {
  var str = '3% of the budget';
  var r = nlp(str);
  r.values().toNumber();
  t.equal(r.out(), str, '3% to number');
  t.end();
});

test('percent-tag:', function (t) {
  var tests = [
    ['7%', true],
    ['7.0%', true],
    ['2.22%', true],
    ['.2%', true],
    ['0.2%', true],
    ['2,999%', true],
  ];
  tests.forEach(function(a) {
    var r = nlp(a[0]);
    t.equal(r.has('#Percent'), a[1], 'Percent-has: \'' + a[0] + '\'');
  });
  t.end();
});
