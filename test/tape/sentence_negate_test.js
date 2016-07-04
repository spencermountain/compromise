var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==negation==', function(T) {

  T.test('negate:', function(t) {
    [
      //copula-sentences
      [`john is good`, `john isn't good`],
      [`they are good`, `they aren't good`],
      [`they will be good`, `they won't be good`],
      //different verb tenses
      [`he walks`, `he doesn't walk`],
      [`he walked`, `he didn't walk`],
      [`he has walked`, `he hasn't walked`],
      [`he will have walked`, `he won't have walked`],
      [`he is walking`, `he isn't walking`],
      //pronoun + infinitive
      [`i like running`, `i don't like running`],
      [`they swim`, `they don't swim`],
      [`we enjoy playing`, `we don't enjoy playing`],
      [`we don't swim`, `we do swim`],
      [`i don't care`, `i do care`],
      [`they don't care`, `they do care`],
      //does not, is not, are not, etc.
      [`apples are not bad`, `apples are bad`],
      [`he does not like it`, `he does like it`],
      [`have not died yet`, `have died yet`],
      //logical negations
      ['john always walks', 'john never walks'],
      ['john always walks quickly', 'john never walks quickly'],
      ['everybody walks quickly', 'nobody walks quickly'],
    ].forEach(function (a) {
      var str = nlp.statement(a[0]).negate().text();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('sentence un-negate:', function(t) {
    [
      //copula-sentences
      [`john isn't good`, `john is good`],
      [`they aren't good`, `they are good`],
      [`they won't be good`, `they will be good`],
      //different verb tenses
      // [`he walks`, `he doesn't walk`],
      // [`he walked`, `he didn't walk`],
      [`he didn't walk`, `he did walk`],
      [`he doesn't walk`, `he does walk`],

      [`he hasn't walked`, `he has walked`],
      [`he won't have walked`, `he will have walked`],
      [`he isn't walking`, `he is walking`],
      // //logical negations
      ['john always walks', 'john never walks'],
      ['john always walks quickly', 'john never walks quickly'],
      // ['everybody walks quickly', 'nobody walks quickly'],

    ].forEach(function (a) {
      var str = nlp.statement(a[0]).negate().text();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});
