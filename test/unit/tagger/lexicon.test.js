var test = require('tape');
var nlp = require('../lib/nlp');
var pos_test = require('../lib/fns').pos_test;

test('default lexicon:', function(t) {
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
    ['google', 'Organization']
  ].forEach(function(a) {
    var r = nlp(a[0]);
    pos_test(r, [a[1]], t);
  });
  t.end();
});

test('root-in-lexicon:', function(t) {
  [
    ['wash', 'Infinitive'],
    ['rewash', 'Infinitive'],
    ['re-wash', 'Infinitive'],
    ['re-washed', 'PastTense'],
    ['rewashed', 'PastTense'],
    ['rewashes', 'PresentTense'],
    ['rewashing', 'Gerund'],

    ['repurchase', 'Infinitive'],
    ['re-purchase', 'Infinitive'],
    ['unpurchase', 'Infinitive'],
    ['purchased', 'PastTense'],
    ['unpurchasing', 'Gerund'],
    ['unpurchases', 'PresentTense'],
    ['resolve', 'Infinitive'],
    ['restructure', 'Infinitive'],
    ['reconcile', 'Infinitive'],
    ['repeat', 'Infinitive'],
  ].forEach(function(a) {
    var r = nlp(a[0]);
    pos_test(r, [a[1]], t);
  });
  t.end();
});

test('adjusted lexicon:', function(t) {
  //place new words
  var lexicon = {
    paris: 'Person',
    lkjj: 'Adjective',
    'donkey kong': 'City'
  };

  var arr = [
    ['paris is nice', ['Person', 'Copula', 'Adjective']],
    ['he is lkjj', ['Pronoun', 'Copula', 'Adjective']],
    ['donkey kong wins the award', ['City', 'City', 'Verb', 'Determiner', 'Noun']]
  ];
  arr.forEach(function(a) {
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

test('tricky lexicon:', function(t) {
  var lexicon = {
    'bed bath and beyond': 'Organization'
  };
  var r = nlp('shopping at Bed Bath and Beyond, the store', lexicon);
  var str = r.organizations().out('normal');
  t.equal(str, 'bed bath and beyond', 'four-word');

  r = nlp('shopping at Bed, Bath, and-beyond the store', lexicon);
  str = r.organizations().out('normal');
  t.equal(str, 'bed bath and beyond', 'partially-hyphenated-word');

  r = nlp('shopping at Bed-bath and-beyond the store', lexicon);
  str = r.organizations().out('normal');
  t.equal(str, 'bed bath and beyond', 'many-hyphenated-word');
  t.end();
});
