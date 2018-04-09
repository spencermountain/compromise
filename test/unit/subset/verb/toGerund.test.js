var test = require('tape');
var nlp = require('../../lib/nlp');

test('verb-to-gerund:', function(t) {
  [
    ['walk', 'is walking'],
    ['sing', 'is singing'],
    ['win', 'is winning'],
    ['will convert', 'is converting'],
    ['see', 'is seeing'],
    ['is', 'is being'],
    ['was', 'is being'],
    ['am', 'is being']
  ].forEach(function(a) {
    var str = nlp(a[0]).verbs().toGerund().out('normal');
    t.equal(str, a[1], str + ' -> ' + a[1]);
  });
  t.end();
});
