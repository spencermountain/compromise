var test = require('tape');
var nlp = require('../../lib/nlp');

test('percent-basic:', function (t) {
  var r = nlp('it is 50%');
  var m = r.match('#Percent');
  t.equal(m.out('normal'), '50%', 'match-50%');

  t.end();
});

test('money-has:', function (t) {
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
    var m = r.match('#Percent');
    t.equal(m.found, a[1], 'Percent-has: \'' + a[0] + '\'');
  });
  t.end();
});
