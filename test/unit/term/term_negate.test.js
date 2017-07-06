var test = require('tape');
var nlp = require('../lib/nlp');

test('verb negate:', function(t) {
  [
    ['is', 'is not'],
    ['will', 'will not'],
    ['will be', 'will not be'],
    ['was', 'was not'],

    ['walks', 'does not walk'],
    ['walked', 'did not walk'],
    // ['walking', 'not walking'],
    // ['walk', 'do not walk'],
    ['will walk', 'will not walk'],
    ['will have walked', 'will not have walked'],

    // ['corrupted', 'did not corrupt'],
    ['jumped', 'did not jump'],
    ['stunk up', 'did not stink up'],

    [`would study`, `would not study`],
    [`could study`, `could not study`],
    [`should study`, `should not study`]
  ].forEach(function(a) {
    var str = nlp(a[0]).verbs().toNegative().out('normal');
    t.equal(str, a[1], a[1] + ' --- ' + str);
  });
  t.end();
});
