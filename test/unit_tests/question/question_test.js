
'use strict';
let nlp = require('../../../src/index.js');
// let questions = require('./questions.js');

describe('question: ', function() {

  let tests = [
    ['which party was it?', 'which'],
    ['which day was it?', 'when'],
    ['but who did you go with?', 'who'],
    ['what time did you show up?', 'when'],
    [`why'd you come so early?`, 'why'],
    [`when'll you show up?`, 'when'],
    [`is it fun?`, 'yesNo'],
    [`was it fun?`, 'yesNo'],
    [`did you think it was fun?`, 'yesNo'],
  ];
  // tests = tests.concat(questions);
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let q = nlp.question(a[0]);
      (q.form() || '').should.equal(a[1]);
      done();
    });
  });

});
