'use strict';
let nlp = require('../../../src/index.js');

describe('sentence negate: ', function() {

  let tests = [
    //copula-sentences
    // [`john is good`, `john isn't good`],
    // [`they are good`, `they aren't good`],
    // [`they will be good`, `they won't be good`],
    // //different verb tenses
    // [`he walks`, `he doesn't walk`],
    // [`he walked`, `he didn't walk`],
    // [`he has walked`, `he hasn't walked`],
    // [`he will have walked`, `he won't have walked`],
    // [`he is walking`, `he isn't walking`],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let s = nlp.sentence(a[0]);
      s.negate();
      s.text().should.equal(a[1]);
      done();
    });
  });


});

//   'john walks to the church',
//   'john walks and feeds the birds',
//   'john always walks',
//   'will you walk?',
