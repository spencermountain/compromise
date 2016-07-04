var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('verb-to-adjective:', function(t) {
  [
    ['walk', 'walkable'],
    ['sing', 'singable'],
    ['win', 'winnable'],
    ['convert', 'convertible'],
    ['see', 'visible'],
  ].forEach(function(a) {
    var str = nlp.verb(a[0]).to_adjective();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});
