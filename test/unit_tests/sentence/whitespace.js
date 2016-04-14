'use strict';
let nlp = require('../../../src/index.js');

describe('whitespace test', function() {

  let tests = [
    'John Smith',
    'John   Smith',
    'John Smith  ',
    'John   Smith  ',
    ' John',
    ' John   Smith  ',
    //no joins
    'he is nice',
    'he   is nice',
    'he   is   nice',
    'he   is   nice  ',
    '  he   is   nice  ',
    //contractions
    `he isn't nice`,
    `he  isn't nice`,
    `he isn't  nice`,
    `he isn't     nice   `,
    `    he   isn't     nice   `,
    //multiples
    'it is ipso facto',
    'it is ipso facto  ',
    'it is   ipso facto  ',
    'it is   ipso    facto  ',
  ];
  tests.forEach(function(a) {
    let s = nlp.sentence(a);
    it(a, function(done) {
      (s.text()).should.equal(a);
      done();
    });
  });


});
