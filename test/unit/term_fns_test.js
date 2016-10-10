var test = require('tape');
var nlp = require('./lib/nlp');

const firstTerm = (str) => {
  return nlp(str).list[0].terms[0];
};

test('==Term_fns==', function(T) {
  T.test('noun:', function(t) {

    var term = firstTerm('flower');
    term.noun.toPlural();
    t.equal(term.normal, 'flowers');
    term.noun.toSingular();
    t.equal(term.normal, 'flower');

    t.end();
  });

  T.test('pronoun:', function(t) {

    var term = firstTerm('he');
    term.pronoun.toPlural();
    t.equal(term.normal, 'they');

    term = firstTerm('those');
    term.pronoun.toSingular();
    t.equal(term.normal, 'this');

    t.end();
  });

  T.test('verb:', function(t) {

    var term = firstTerm('is');
    term.verb.toPlural();
    t.equal(term.normal, 'are');

    term = firstTerm('walks');
    term.verb.toPlural();
    t.equal(term.normal, 'walk');

    term = firstTerm('walked');
    term.verb.conjugation();
    t.equal(term.normal, 'PastTense');

    t.end();
  });
});
