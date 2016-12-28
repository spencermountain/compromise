var test = require('tape');
var nlp = require('../lib/nlp');
var pos_test = require('../lib/fns').pos_test;

test('=Lexicon test=', function (T) {

  T.test('default lexicon:', function (t) {
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
      var r = nlp(a[0]);
      pos_test(r, [a[1]], t);
    });
    t.end();
  });

  T.test('adjusted lexicon:', function (t) {
    //place new words
    var lexicon = {
      'paris': 'Person',
      'lkjj': 'Adjective',
      'donkey kong': 'City'
    };

    var arr = [
      ['paris is nice', ['Person', 'Copula', 'Adjective']],
      ['he is lkjj', ['Pronoun', 'Copula', 'Adjective']],
      ['donkey kong wins the award', ['City', 'Verb', 'Determiner', 'Noun']],
    ];
    arr.forEach(function (a) {
      var r = nlp(a[0], lexicon);
      pos_test(r, a[1], t);
    });
    //
    //set gender from lexicon
    var terms = nlp('Kelly', lexicon);
    pos_test(terms, ['FemaleName'], t);
    //set as male:
    lexicon = {
      kelly: 'MaleName'
    };
    terms = nlp('Kelly', lexicon);
    pos_test(terms, ['MaleName'], t);
    //gender follows lumping
    terms = nlp('Kelly Gruber', lexicon);
    pos_test(terms, ['MaleName', 'LastName'], t);

    t.end();
  });
});
