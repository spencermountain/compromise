var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

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

  T.test('text():', function(t) {
    garbage.forEach(function (g, i) {
      var num = nlp.text(g).sentences.length;
      var msg = (typeof g) + i;
      t.equal(num, 0, msg);
    });
    t.end();
  });

  T.test('sentence():', function(t) {
    garbage.forEach(function (g, i) {
      var num = nlp.sentence(g).terms.length;
      var msg = (typeof g) + i;
      t.equal(num, 0, msg);
    });
    t.end();
  });

  T.test('term():', function(t) {
    garbage.forEach(function (g, i) {
      terms.forEach(function(term, ti) {
        var str = term(g).normal;
        var msg = (typeof g) + ' term ' + ti;
        t.equal(str, '', msg);
      });
    });
    t.end();
  });

});
