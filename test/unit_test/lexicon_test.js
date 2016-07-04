var test = require('tape');
var nlp = require('./lib/nlp');
var pos_test = require('./lib/fns').pos_test;

test('=Lexicon test=', function(T) {

  T.test('default lexicon:', function(t) {
    var lexicon = nlp.lexicon();
    [
      ['great', 'Adjective'],
      ['walked', 'PastTense'],
      ['singing', 'Gerund'],
      ['funniest', 'Superlative'],
      ['sillier', 'Comparative'],
      ['the', 'Determiner'],
      ['iraqi', 'Demonym'],
      ['december', 'Date'],
      ['fifth', 'Value'],
      ['suddenly', 'Adverb'],
      ['shanghai', 'City'],
      ['google', 'Organization'],
    ].forEach(function (a) {
      var msg = 'lexicon has ' + a[0] + ' : ' + a[1] + ' (' + lexicon[a[0]] + ')';
      t.equal(lexicon[a[0]], a[1], msg);
    });
    t.end();
  });

  T.test('adjusted lexicon:', function(t) {
    //place new words
    nlp.lexicon({
      'paris': 'Person',
      'lkjj': 'Adjective',
      'donkey kong': 'City',
    });
    [
      ['paris is nice', ['Person', 'Copula', 'Adjective']],
      ['he is lkjj', ['Pronoun', 'Copula', 'Adjective']],
      ['donkey kong wins the award', ['City', 'Verb', 'Determiner', 'Noun']],
    ].forEach(function (a) {
      var terms = nlp.sentence(a[0]).terms;
      pos_test(terms, a[1], t);
    });

    //set gender from lexicon
    var terms = nlp.sentence('Kelly').terms;
    pos_test(terms, ['FemalePerson'], t);
    //set as male:
    nlp.lexicon({
      kelly: 'MalePerson'
    });
    terms = nlp.sentence('Kelly').terms;
    pos_test(terms, ['MalePerson'], t);
    //gender follows lumping
    terms = nlp.sentence('Kelly Gruber').terms;
    pos_test(terms, ['MalePerson'], t);

    t.end();
  });
});
