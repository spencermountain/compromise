var test = require('tape');
var nlp = require('./lib/nlp');

var garbage = [
  '',
  '  ',
  null,
  '\n\n',
  [],
  {},
];

var terms = [
  nlp.term,
  nlp.verb,
  nlp.noun,
  nlp.adverb,
  nlp.adjective,
  nlp.value,
  nlp.person,
  nlp.place,
  nlp.organization,
];
test('==Garbage tests==', function(T) {

  T.test('text() garbage:', function(t) {
    garbage.forEach(function (g) {
      var num = nlp.text(g).sentences.length;
      var msg = (typeof g) + 'text input';
      t.equal(num, 0, msg);
    });
    t.end();
  });

  T.test('sentence() garbage:', function(t) {
    garbage.forEach(function (g) {
      var num = nlp.sentence(g).terms.length;
      var msg = (typeof g) + ' sentence input';
      t.equal(num, 0, msg);
    });
    t.end();
  });

  T.test('term() garbage:', function(t) {
    garbage.forEach(function (g) {
      terms.forEach(function(term) {
        var str = term(g).normal;
        var msg = JSON.stringify(g) + ' term input';
        t.equal(str, '', msg);
      });
    });
    t.end();
  });

});
