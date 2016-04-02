'use strict';
let nlp = require('../../../src/index.js');


describe('sentence negate: ', function() {
  let tests = [
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
    //logical negations
    ['john always walks', 'john never walks'],
    ['john always walks quickly', 'john never walks quickly'],
    ['everybody walks quickly', 'nobody walks quickly'],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let s = nlp.statement(a[0]);
      s.negate();
      s.text().should.equal(a[1]);
      done();
    });
  });
});

describe('sentence un-negate: ', function() {
  let tests = [
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
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let s = nlp.statement(a[0]);
      s.negate();
      s.text().should.equal(a[1]);
      done();
    });
  });
});

//   'john walks to the church',
//   'john walks and feeds the birds',
//   'will you walk?',
