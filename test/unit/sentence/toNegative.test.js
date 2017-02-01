var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

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
      [`he walked`, `he did not walk`],
      [`he has walked`, `he has not walked`],
      [`he will have walked`, `he will not have walked`],
      [`he is walking`, `he is not walking`],
      //pronoun + infinitive
      // [`i like running`, `i do not like running`],
      // [`they swim`, `they do not swim`],
      // [`we enjoy playing`, `we do not enjoy playing`],
      // [`we do not swim`, `we do swim`],
      // [`i do not care`, `i do care`],
      // [`they do not care`, `they do care`],
      //does not, is not, are not, etc.
      // [`apples are not bad`, `apples are bad`],
      // [`he does not like it`, `he does like it`],
      // [`have not died yet`, `have died yet`],
      //logical negations
      ['john always walks', 'john never walks'],
      ['john always walks quickly', 'john never walks quickly'],
      ['everybody walks quickly', 'nobody walks quickly'],
    ].forEach(function (a) {
      var str = nlp(a[0]).sentences().toNegative().out('text');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

//   T.test('sentence un-negate:', function(t) {
//     [
//       //copula-sentences
//       [`john is not good`, `john is good`],
//       [`they are not good`, `they are good`],
//       [`they wo not be good`, `they will be good`],
//       //different verb tenses
//       // [`he walks`, `he does not walk`],
//       // [`he walked`, `he did not walk`],
//       [`he did not walk`, `he did walk`],
//       [`he does not walk`, `he does walk`],
//
//       [`he has not walked`, `he has walked`],
//       [`he wo not have walked`, `he will have walked`],
//       [`he is not walking`, `he is walking`],
//       // //logical negations
//       ['john always walks', 'john never walks'],
//       ['john always walks quickly', 'john never walks quickly'],
//       // ['everybody walks quickly', 'nobody walks quickly'],
//
//     ].forEach(function (a) {
//       var str = nlp(a[0]).toNegative().out('text');
//       str_test(str, a[0], a[1], t);
//     });
//     t.end();
//   });
});
