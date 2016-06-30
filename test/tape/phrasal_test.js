var test = require('tape');
var nlp = require('./lib/nlp');
var terms_test = require('./lib/fns').terms_test;


test('phrasal-verbs:', function(t) {
  [
    [`he is really good`, ['he', 'is', 'really', 'good']],
    [`he is upset about it`, ['he', 'is', 'upset', 'about', 'it']],
    [`he will mess about with it`, ['he', 'will mess about', 'with', 'it']],

    [`come forward`, ['come forward']],
    [`come together`, ['come together']],
    [`come apart`, ['come apart']],

    [`frighten back`, ['frighten', 'back']],
    [`frighten away`, ['frighten away']],
  ].forEach(function (a) {
    var terms = nlp.sentence(a[0]).terms;
    terms_test(terms, a[1], t);
  });
  t.end();
});
