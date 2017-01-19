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
    var str = nlp(a[0]).list[0].terms[0].verb.asAdjective();
    t.equal(str, a[1], str + ' -> ' + a[1]);
  });
  t.end();
});
