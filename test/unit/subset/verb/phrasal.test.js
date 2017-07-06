var test = require('tape');
var nlp = require('../../lib/nlp');

test('phrasal-verbs:', function(t) {
  [
    [`he is really good`, ['he', 'is', 'really', 'good']],
    [`he is upset about it`, ['he', 'is', 'upset', 'about', 'it']],
    [`he will mess about with it`, ['he', 'will', 'mess about', 'with', 'it']],

    [`come forward`, ['come forward']],
    [`come together`, ['come together']],
    [`come apart`, ['come apart']],

    [`frighten back`, ['frighten', 'back']],
    [`frighten away`, ['frighten away']]
  ].forEach(function(a) {
    var terms = nlp(a[0]).out('array');
    var msg = terms.join(' ') + '  -- ' + a[1].join(' ');
    t.equal(terms.join(' '), a[1].join(' '), msg);
  });
  t.end();
});
