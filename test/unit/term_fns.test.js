var test = require('tape');
var nlp = require('./lib/nlp');

const firstTerm = (str) => {
  return nlp(str).list[0].terms[0];
};

test('==Term_fns==', function(T) {
  T.test('noun:', function(t) {

    var term = firstTerm('flower');
    t.equal(term.noun.plural(), 'flowers');
    term = firstTerm('flowers');
    t.equal(term.noun.singular(), 'flower');

    t.end();
  });

  T.test('pronoun:', function(t) {

    var term = firstTerm('he');
    t.equal(term.pronoun.toPlural(), 'they');

    term = firstTerm('those');
    t.equal(term.pronoun.toSingular(), 'this');

    t.end();
  });

  T.test('verb:', function(t) {

    var term = firstTerm('is');
    t.equal(term.verb.toPlural(), 'are');

    term = firstTerm('walks');
    t.equal(term.verb.toPlural(), 'walk');

    term = firstTerm('walked');
    t.equal(term.verb.conjugation(), 'PastTense');

    var conj = term.verb.conjugate();
    t.equal(conj.Gerund, 'walking');
    t.end();
  });
});
