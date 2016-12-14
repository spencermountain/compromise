var test = require('tape');
var nlp = require('../lib/nlp');

test('hypthens', function (t) {
  var r = nlp('super-cool work');
  t.equal(r.terms().length, 3, 'super, cool');

  t.end();
});
