var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('==negation==', function(T) {
  T.test('negate:', function(t) {
    [
      //copula-sentences
      [`john is good`, `john is not good`],
      [`they are good`, `they are not good`],
      [`they will be good`, `they will not be good`],
      [`they will really be good`, `they will not really be good`],
      //different verb tenses
      [`he walks`, `he does not walk`],
      [`he will walk`, `he will not walk`],
      [`he walked`, `he did not walk`],
      [`he has walked`, `he has not walked`],
      [`he will have walked`, `he will not have walked`],
      [`he is walking`, `he is not walking`],
      //add adverbs
      [`he really walks`, `he really does not walk`],
      [`he will really walk`, `he will not really walk`],
      [`he really walked`, `he really did not walk`],
      [`he has really walked`, `he has not really walked`],
      [`he will have really walked`, `he will not have really walked`],
      [`he is really walking`, `he is not really walking`],
      //plural noun
      [`they walk`, `they do not walk`],
      //pronoun + infinitive
      [`i like running`, `i do not like running`],
      [`they swim`, `they do not swim`],
      [`we enjoy playing`, `we do not enjoy playing`],
      [`we swim`, `we do not swim`],
      [`we do swim`, `we do not swim`],
      [`i do care`, `i do not care`],
      [`they do care`, `they do not care`],

      //does not, is not, are not, etc.
      [`apples are bad`, `apples are not bad`],
      [`he does like it`, `he does not like it`],
      [`have died yet`, `have not died yet`],
      //logical negations
      ['john always walks', 'john never walks'],
      ['john always walks quickly', 'john never walks quickly'],
      ['everybody walks quickly', 'nobody walks quickly'],

      [`has played`, `has not played`],
      [`he has played`, `he has not played`],
      [`spencer is playing`, `spencer is not playing`],
      [`he will play`, `he will not play`],
      [`he will be playing`, `he will not be playing`],
      [`he had played`, `he had not played`],
      [`he plays`, `he does not play`],
      [`he played`, `he did not play`],
      [`he walked`, `he did not walk`]
    // [`he quietly walked`, `he did not quietly walk`],
    // [`he quietly walks`, `he does not quietly walk`],
    // [`we quietly walked`, `we do not quietly walk`],
    // [`we quietly walks`, `we do not quietly walk`]
    ].forEach(function(a) {
      var str = nlp(a[0]).sentences().toNegative().out('text');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('sentence un-negate:', function(t) {
    [
      //copula-sentences
      [`john is not good`, `john is good`],
      [`they are not good`, `they are good`],
      [`they will not be good`, `they will be good`],
      //different verb tenses
      [`he does not walk`, `he does walk`],
      [`he did not walk`, `he did walk`],
      [`he is not walking`, `he is walking`],
      [`he has not been walking`, `he has been walking`],
      [`he did not walk`, `he did walk`],
      [`he does not walk`, `he does walk`],

      [`he has not walked`, `he has walked`],
      [`he will not have walked`, `he will have walked`],
      [`he is not walking`, `he is walking`],
      // //logical negations
      ['john never walks', 'john always walks'],
      ['john never walks quickly', 'john always walks quickly']
    // ['everybody walks quickly', 'nobody walks quickly'],
    ].forEach(function(a) {
      var str = nlp(a[0]).sentences().toPositive().out('text');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});
