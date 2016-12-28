var test = require('tape');
var nlp = require('../lib/nlp');

test('verb-to-adjective:', function(t) {
  [
    ['walk', 'walkable'],
    ['sing', 'singable'],
    ['win', 'winnable'],
    ['convert', 'convertible'],
    ['see', 'visible'],
  ].forEach(function(a) {
    var str = nlp(a[0]).verbs().toAdjective().plaintext();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});
