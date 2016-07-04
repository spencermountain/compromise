var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('term negate:', function(t) {
  [
    ['is', 'isn\'t'],
    ['will', 'won\'t'],
    ['will be', 'won\'t be'],
    ['was', 'wasn\'t'],

    ['walks', 'doesn\'t walk'],
    ['walked', 'didn\'t walk'],
    ['walking', 'not walking'],
    ['walk', 'don\'t walk'],
    ['will walk', 'won\'t walk'],
    ['will have walked', 'won\'t have walked'],

    ['corrupted', 'didn\'t corrupt'],
    ['jumped', 'didn\'t jump'],
    ['stunk up', 'didn\'t stink up'],

    [`would study`, `wouldn't study`],
    [`could study`, `couldn't study`],
    [`should study`, `shouldn't study`],
  ].forEach(function(a) {
    var str = nlp.verb(a[0]).negate().normal;
    str_test(str, a[0], a[1], t);
  });
  t.end();
});
