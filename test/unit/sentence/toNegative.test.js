var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;
// console.log(nlp('has played').sentences().toNegative().all().out());
// console.log(nlp('he has played').sentences().toNegative().out());
// console.log(nlp('is playing').sentences().toNegative().out());
// console.log(nlp('spencer is playing').sentences().toNegative().out());
// console.log(nlp('will play').sentences().toNegative().out());
// console.log(nlp('will be playing').sentences().toNegative().out());
// console.log(nlp('had played').sentences().toNegative().out());
// console.log('');
// console.log(nlp('plays').sentences().toNegative().out());
// console.log(nlp('played').sentences().toNegative().out());
// console.log(nlp('he walked').sentences().toNegative().out());
// console.log(nlp('he has quietly surely walked on the ground').sentences().toNegative().out());
// console.log(nlp('she really walked').sentences().toNegative().out('normal'));
// console.log(nlp('he walks').sentences().toNegative().out('normal'));
///===singular
// pastTense -  john played -> john did not play
// presentTense - john plays  -> john does not play
// futureTense - john will play  -> john will not play

///===plural
// pastTense -  we played -> we did not play
// presentTense - we play  -> we do not play
// futureTense -  we will play -> we will not play

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
